import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { HeaderStudyComponent } from '../header-study/header-study';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  NgxEditorComponent,
  Editor,
  NgxEditorModule,
  Toolbar,
} from 'ngx-editor';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import schema from '../text-editor/configuration/schema';
import nodeViews from '../text-editor/configuration/nodeviews';
import { NewCardService } from '../new-card/services/new-card';
import { ButtonsTimeComponent } from '../buttons-time/buttons-time';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  delay,
  from,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timeout,
  timer,
} from 'rxjs';
import { DynamicTimeService } from '../buttons-time/services/dynamic-time-service';
import { StudyService } from '../../pages/study/services/study';
import { ICard } from '../card/interface/card.interface';
import { CardsApiServices } from '../../../core/services/cards-api-services/cards-api-services';

@Component({
  selector: 'app-learning-card',
  imports: [
    CommonModule,
    SplitterModule,
    CarouselModule,
    ButtonModule,
    HeaderStudyComponent,
    NgxEditorComponent,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsTimeComponent,
  ],
  templateUrl: './learning-card.html',
  styleUrl: './learning-card.scss',
})
export class LearningCardComponent implements OnInit {
  isVisible = signal<boolean>(false);
  isResponsesVisible = computed(() => this.isVisible());
  itemSelected = signal({});
  moveToPage = signal<number>(0);
  currentPage = computed<number>(() => {
    console.log(
      '%cmove ',
      'background: purple; color: white; display: block;',
      this.moveToPage(),
    );
    return this.moveToPage();
  });
  moveCarouselPage = signal({
    clicked: false,
    time: 0,
  });
  isStudyMode = signal<boolean>(false);

  fb = new FormBuilder();

  editorTitle!: Editor;
  editorAnswer!: Editor;
  editorList: { editorTitle: Editor; editorMeaning: Editor }[] = [];

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    // ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  // items: WritableSignal<Array<any>> = signal([]);
  itemsList = new Set<Array<any>>();
  // itemsList: Array<any> = [];
  items: Array<ICard> =
    // {
    //   id: number,
    //   disparador$: BehaviorSubject<number | null>,
    //   editorTitle: Editor | null,
    //       editorMeaning: Editor | null,
    //       delay: number,
    //       title: string;
    //       meaning: string;
    // }
    [];
  itemsLength: number = 0;

  form!: FormGroup;
  timeFromButtons = computed(() => this.moveCarouselPage().time);
  newCardService = inject(NewCardService);
  dynamicTimeService = inject(DynamicTimeService);
  studyService = inject(StudyService);

  cardsApiServices = inject(CardsApiServices);

  router = inject(Router);
  activedRoute = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      console.log(
        '%cmoveCarouselPage  ',
        'color: red; display: block; width: 100%;',
        this.moveCarouselPage(),
      );
      if (this.moveCarouselPage().clicked) {
        this.moveToPage.update((current) => {
          const currentPage = current + 1;
          if (this.items.length > currentPage) {
            console.log(
              '%ccurrentPage 1',
              'background: purple; color: white; display: block;',
              currentPage,
              this.items,
            );
            if (this.isStudyMode()) {
              this.setTimerItems();
            }
            console.log(
              '%ccurrentPage 2',
              'background: purple; color: white; display: block;',
              currentPage,
              this.items,
            );
            return currentPage;
          }
          if (this.isStudyMode()) {
            this.setTimerItems();
          }
          return 0;
        });
        // this.moveCarouselPage.set(false);
      } else {
        if (this.isStudyMode()) {
          this.scheduleItem(this.items[this.getItemsLength()]);
        }

        // this.moveCarouselPage.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).some((it) => it === 'idSet')) {
        this.isStudyMode.set(true);
      } else {
        this.isStudyMode.set(false);
      }
    });

    this.items = this.studyService.cardList();
    this.itemsLength = this.items.length;
    this.generateDxEditorInstance();

    const itemGroup = this.items.map((it) => {
      return this.createItemGroup(it.title, it.answer);
    });
    this.form = this.fb.group({
      title: [
        '<p style="text-align: center;"><strong><span style…42, 192);">forthcoming</span></span></strong></p>',
      ],
      cards: this.fb.array(itemGroup),
    });
  }

  generateDxEditorInstance(): void {
    this.editorList = this.items.map(() => {
      return {
        editorTitle: new Editor(),
        editorMeaning: new Editor(),
      };
    });
    this.items = this.items.map((it, index) => {
      return {
        ...it,
        editorTitle: this.editorList[index].editorTitle,
        editorMeaning: this.editorList[index].editorMeaning,
      };
    });
    // this.items.forEach((it) => {
    //   this.itemsList.add(it);
    // });

    console.log(
      '%citems ',
      'background: purple; color: white; display: block;',
      this.items,
    );
    // this.newCardService.cardSelected$.set(this.items[this.getItemsLength()]);
  }

  get cardItemArray(): FormArray<any> {
    return this.form.get('cards') as FormArray;
  }

  createItemGroup(title: string, meaning: string): FormGroup {
    return this.fb.group({
      title,
      meaning,
    });
  }

  makeRequest(timeToDelay: number) {
    return of('Request Complete!').pipe(delay(timeToDelay));
  }

  getItemsLength(): number {
    return this.items.length - 1;
  }

  scheduleItem(item: any): void {
    // this.items = this.items.filter((it) => it.id !== item.id).map((it) => it);
    console.log(
      '%citems ANTES DEL TIMER ',
      'background: red; color: white; display: block;',
      this.items,
      item,
    );
    if (item) {
      if (item.delay) {
        console.log(
          '%cscheduleItem 1 ITEM  CON DELAY',
          'background: purple; color: white; display: block;',
          item,
        );
        this.dynamicTimeService.time.set(item.delay);
        this.updateCard(item);

        timer(item.delay).subscribe(() => {
          if (
            !this.items.length ||
            !this.items.find((it) => it.id === item.id)
          ) {
            this.items.push(item);
            console.log(
              '%citems DESPUES DEL TIMER ',
              'background: cyan; color: white; display: block;',
              this.items,
            );
          }
        });
      } else {
        console.log(
          '%cscheduleItem 2  ITEM SIN DELAY',
          'background: purple; color: white; display: block;',
          item,
        );
        this.dynamicTimeService.time.set(item.delay);
      }
    }
  }

  updateCard(item: ICard): void {
    this.cardsApiServices
      .requestCard(item)
      .then((cardUpdated: ICard) =>
        console.log(
          '%cUpdated Card ',
          'color: red; display: block; width: 100%;',
          cardUpdated,
        ),
      );
  }

  setTimerItems(): void {
    // this.items.shift();

    console.log(
      '%cthis.items[this.getItemsLength()] ',
      'background: purple; color: white; display: block;',
      this.items[this.getItemsLength()],
    );
    const previousItem = this.getItemsLength()
      ? this.getItemsLength() - 1
      : this.getItemsLength();

    // if (!this.items[previousItem].delay) {
    //   this.dynamicTimeService.time.set(0);
    // }

    if (this.items[this.getItemsLength()].delay === null) {
      this.items[this.getItemsLength()].delay = this.timeFromButtons();
    }
    if (this.isStudyMode()) {
      this.scheduleItem(this.items[this.getItemsLength()]);
    }
    console.log(
      '%cthis.items[this.getItemsLength()] ',
      'color: white; background-color: #007acc;',
      this.items[this.getItemsLength()],
    );

    this.items.pop();
  }

  onSlideChange(e: any): void {
    this.isVisible.set(false);
    this.itemSelected.set(this.items[e.page]);
    console.log(
      '%citemSelected  ',
      'color: white; background-color: #007acc;',
      this.itemSelected(),
    );
    if (this.isStudyMode() && this.items.length <= this.itemsLength) {
      console.log(
        '%conSlideChange previous item Selected ',
        'background: yellow; color: white; display: block;',
        this.items[this.getItemsLength()],
      );
      // this.scheduleItem(this.items[this.getItemsLength()]);
      this.dynamicTimeService.time.set(
        this.items[this.getItemsLength()].delay as number,
      );
    }
    // this.newCardService.cardSelected$.set(this.items[this.getItemsLength()]);
  }

  showResponses(): void {
    this.isVisible.update((isVisible) => !isVisible);
  }

  products = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' },
  ];

  hideProduct(id: number) {
    // this.items = this.items.filter((p) => p.id !== id);
    this.items.pop();
    // this.items.shift();
  }
}
