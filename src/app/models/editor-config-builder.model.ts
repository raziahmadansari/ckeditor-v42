import {
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import {
  Comments,
  ExportPdf,
  ExportWord,
  ImportWord,
  MultiLevelList,
  Pagination,
  PresenceList,
  RealTimeCollaborativeComments,
  RealTimeCollaborativeEditing,
} from 'ckeditor5-premium-features';

import { LICENSE_KEY } from './editor.constant';
import { AnnotationsSidebarToggler } from '../plugins';

export class EditorConfigBuilder {
  private config!: EditorConfig;

  constructor() {
    this.config = {};
    this.config.licenseKey = LICENSE_KEY;
    this.config.placeholder = 'Type or paste your content here!';

    // presenceList: {
    //   container: this.editorPresence.nativeElement,
    // },
    // sidebar: {
    //   container: this.editorAnnotations.nativeElement,
    // },

    // cloudServices: {
    //   tokenUrl: CLOUD_SERVICES_TOKEN_URL,
    //   webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL,
    // },
    // collaboration: {
    //   channelId: UNIQUE_CHANNEL_PER_DOCUMENT,
    // },
  }

  addToolbarConfig(): EditorConfigBuilder {
    this.config.toolbar = {
      items: [
        'undo',
        'redo',
        '|',
        'previousPage',
        'nextPage',
        'pageNavigation',
        '|',
        'comment',
        'commentsArchive',
        '|',
        'importWord',
        'exportWord',
        'exportPdf',
        'findAndReplace',
        'selectAll',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        'removeFormat',
        '|',
        'specialCharacters',
        'horizontalLine',
        'pageBreak',
        'link',
        'insertImageViaUrl',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'multiLevelList',
        'todoList',
        'indent',
        'outdent',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: true,
    };

    return this;
  }

  addBalloonToolbarConfig(): EditorConfigBuilder {
    this.config.balloonToolbar = [
      'comment',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      '|',
      'bulletedList',
      'numberedList',
    ];

    return this;
  }

  addFullPluginsSupport(): EditorConfigBuilder {
    this.config.plugins = [
      AccessibilityHelp,
      Alignment,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      Comments,
      Essentials,
      ExportPdf,
      ExportWord,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImportWord,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Mention,
      MultiLevelList,
      PageBreak,
      Pagination,
      Paragraph,
      PasteFromOffice,
      // PresenceList,
      RealTimeCollaborativeComments,
      RealTimeCollaborativeEditing,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
      Undo,
    ];

    return this;
  }

  addExtraPluginsSupport(): EditorConfigBuilder {
    this.config.extraPlugins = [AnnotationsSidebarToggler];

    return this;
  }

  addCommentsConfig(): EditorConfigBuilder {
    this.config.comments = {
      editorConfig: {
        extraPlugins: [Bold, Italic, List, Mention],
        mention: {
          feeds: [
            {
              marker: '@',
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#comments-with-mentions */
              ],
            },
          ],
        },
      },
    };

    return this;
  }

  addExportPDFConfig(): EditorConfigBuilder {
    this.config.exportPdf = {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        './styles.css',
        /* Export PDF needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-pdf-demo.pdf',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        page_orientation: 'portrait',
      },
    };

    return this;
  }

  addExportWordConfig(): EditorConfigBuilder {
    this.config.exportWord = {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        './styles.css',
        /* Export Word needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-word-demo.docx',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        orientation: 'portrait',
      },
    };

    return this;
  }

  addFontFamilyConfig(): EditorConfigBuilder {
    this.config.fontFamily = {
      supportAllValues: true,
    };

    return this;
  }

  addFontSizeConfig(): EditorConfigBuilder {
    this.config.fontSize = {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    };

    return this;
  }

  addHeadingConfig(): EditorConfigBuilder {
    this.config.heading = {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    };

    return this;
  }

  addImageConfig(): EditorConfigBuilder {
    this.config.image = {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    };

    return this;
  }

  addLinkConfig(): EditorConfigBuilder {
    this.config.link = {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    };

    return this;
  }

  addListConfig(): EditorConfigBuilder {
    this.config.list = {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    };

    return this;
  }

  addMentionConfig(): EditorConfigBuilder {
    this.config.mention = {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    };

    return this;
  }

  addMenuBarConfig(): EditorConfigBuilder {
    this.config.menuBar = {
      isVisible: true,
    };

    return this;
  }

  addPaginationConfig(): EditorConfigBuilder {
    this.config.pagination = {
      pageWidth: '21cm',
      pageHeight: '29.7cm',
      pageMargins: {
        top: '20mm',
        bottom: '20mm',
        right: '12mm',
        left: '12mm',
      },
    };

    return this;
  }

  addTableConfig(): EditorConfigBuilder {
    this.config.table = {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    };

    return this;
  }

  addSidebarSupport(sidebarElement: HTMLElement): EditorConfigBuilder {
    this.config.sidebar = {
      container: sidebarElement,
    };

    return this;
  }

  getConfig(): EditorConfig {
    return this.config;
  }
}
