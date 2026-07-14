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
  moveCarouselPage = signal(0);
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
  items: Array<any> =
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

  form!: FormGroup;
  timeFromButtons = computed(() => this.moveCarouselPage());
  newCardService = inject(NewCardService);
  router = inject(Router);
  activedRoute = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      console.log(
        '%cmoveCarouselPage  ',
        'color: red; display: block; width: 100%;',
        this.moveCarouselPage(),
      );
      if (this.moveCarouselPage()) {
        this.moveToPage.update((current) => {
          const currentPage = current + 1;
          if (this.items.length > currentPage) {
            return currentPage;
          }
          return 0;
        });
        // this.moveCarouselPage.set(false);
      } else {
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
    this.items = [
      {
        id: 0,
        disparador$: new BehaviorSubject<number | null>(null),
        editorTitle: null,
        delay: 2000,
        editorMeaning: null,
        title:
          '<p style="text-align: center;"><strong><span style…42, 192);">forthcoming</span></span></strong></p>',
        meaning:
          '<p><u>It is</u> <strong>an</strong> <span style="color: rgb(14, 138, 22);">example </span></p>',
      },
      {
        id: 1,
        disparador$: new BehaviorSubject<number | null>(null),
        editorTitle: null,
        delay: 3000,
        editorMeaning: null,
        title:
          '<p style="text-align: center;"><strong><span style…42, 192);">forthcoming example 1</span></span></strong></p>',
        meaning:
          '<p><u>It is</u> <strong>an</strong> <span style="color: rgb(14, 138, 22);">example </span></p>',
      },
      {
        id: 2,
        disparador$: new BehaviorSubject<number | null>(null),
        editorTitle: null,
        delay: 4000,
        editorMeaning: null,
        title:
          '<p style="text-align: center;"><strong><span style…42, 192);">forthcoming  example 2</span></span></strong></p>',
        meaning:
          '<p><u>It is</u> <strong>an</strong> <span style="color: rgb(14, 138, 22);">example </span></p>',
      },
      {
        id: 3,
        disparador$: new BehaviorSubject<number | null>(null),
        editorTitle: null,
        delay: 5000,
        editorMeaning: null,
        title:
          '<p style="text-align: center;"><strong><span style…42, 192);">Raid</span></span></strong></p>',
        meaning:
          '<p><strong>Hacer una redada, asaltar/saquear</strong></p><p>&nbsp; &nbsp; &nbsp; Her kids are always raiding the fridge.</p>',
      },
      {
        id: 4,
        disparador$: new BehaviorSubject<number | null>(null),
        editorTitle: null,
        delay: 6000,
        editorMeaning: null,
        title: 'Shudder',
        meaning: `Escalofrio

      Linda shuddered when she thought how close she had come to a serious accident.

      She shuddered at the thought of eating raw meat.`,
      },
    ];
    this.generateDxEditorInstance();

    this.setItemsDelay();

    const itemGroup = this.items.map((it) => {
      return this.createItemGroup(it.title, it.meaning);
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
    this.items.forEach((it) => {
      this.itemsList.add(it);
    });

    console.log(
      '%citems ',
      'background: purple; color: white; display: block;',
      this.items,
    );
    this.newCardService.cardSelected$.set(this.items[0]);
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

  scheduleItem(item: any): void {
    // this.itemsList.forEach((it: any) => {
    //   if (it.id === item.id) {
    //     this.itemsList.delete(item);
    //   }
    // });
    // this.itemsList = this.itemsList.values().filter((it) => it.id !== item.id);
    this.items = this.items.filter((it) => it.id !== item.id).map((it) => it);
    console.log(
      '%citemsList ANTES DEL TIMER ',
      'background: purple; color: white; display: block;',
      // this.itemsList,
      this.items,
    );
    console.log(
      '%citemsList ANTES DEL TIMER ',
      'background: cyan; color: white; display: block;',
      this.items,
      // [...this.itemsList],
    );
    timer(item.delay).subscribe(() => {
      this.items.push(item);
      // this.itemsList.add(item);
      // console.log(
      //   '%citemsList DESPUES DEL TIMER ',
      //   'background: purple; color: white; display: block;',
      //   this.itemsList,
      // );
    });
  }

  onSlideChange(e: any): void {
    this.isVisible.set(false);
    if (this.isStudyMode()) {
      const previousItem = e.page === 0 ? e.page : e.page - 1;

      this.items[previousItem].delay = this.timeFromButtons();
      this.scheduleItem(this.items[previousItem]);
      // this.items[2].delay = 5000;
      // this.scheduleItem(this.items[2]);
      // this.items[2].disparador$.next(5000);
      // this.items[1].disparador$.next(10000);

      console.log(
        '%cprevious item Selected ',
        'background: yellow; color: white; display: block;',
        this.items[previousItem],
      );
    }
    console.log(
      '%citem Selected ',
      'background: green; color: white; display: block;',
      this.items[e.page],
    );
    this.itemSelected.set(this.items[e.page]);
    this.newCardService.cardSelected$.set(this.items[e.page]);
  }

  showResponses(): void {
    this.isVisible.update((isVisible) => !isVisible);
  }

  destroy$ = new Subject<void>();
  setItemsDelay(): void {
    const removedItem: any[] = [];
    // this.items.forEach((item) => {
    //   item.disparador$
    //     .pipe(
    //       mergeMap((tiempoDelay: number | null) => {
    //         if (tiempoDelay === null) return timer(0).pipe(mergeMap(() => []));
    //         const items = this.items
    //           .filter((el) => el.id !== item.id)
    //           .map((it) => it);

    //         removedItem.push(item.id);
    //         this.itemsList = this.items
    //           .filter((it) => it.id !== item.id)
    //           .map(
    //             (it) => it,
    //             // (it) => it.id !== removedItem.some((el: any) => el.id),
    //           );
    //         console.log(
    //           '%citem con delay ',
    //           'color: red; display: block; width: 100%;',
    //           item,
    //           this.itemsList,
    //           removedItem,
    //         );
    //         return timer(tiempoDelay);
    //       }),
    //       // takeUntil(this.destroy$),
    //     )
    //     .subscribe((e: any) => {
    //       this.itemsList.push(item);
    //       console.log(
    //         '%csubscribe setItemsDelay ',
    //         'color: purple; display: block; width: 100%;',
    //         e,
    //         this.items,
    //         item,
    //       );
    //     });
    // });
  }
}
