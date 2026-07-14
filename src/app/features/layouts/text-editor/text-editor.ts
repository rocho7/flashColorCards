import { Component, Input } from '@angular/core';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { setBlockType } from 'prosemirror-commands';
import { CommonModule } from '@angular/common';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';

@Component({
  selector: 'app-text-editor',
  imports: [CommonModule],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
})
export class TextEditorComponent {
  @Input() editor!: Editor;
  isActive = false;
  isDisabled = false;

  ngOnInit(): void {
    this.editor.update.subscribe((view: EditorView) => this.update(view));
  }

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive) {
      return setBlockType(schema.nodes['paragraph'])(state, dispatch);
    }

    return setBlockType(schema.nodes['code_mirror'])(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirror']);
    this.isDisabled = !this.execute(state, undefined); // returns true if executable
  };
}
