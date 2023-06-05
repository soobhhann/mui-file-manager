/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MediaListInterface {
  folders: { name: string; full_path: string; path: string }[];
  files: FileListInterface[];
}

interface FileListOptionalInterface {
  prefix: string;
  separator: string;
  name: string;
  extension: string;
  disk: string;
  path: string;
  full_name: string;
  file: string;
  size: number;
  size_prettified: string;
  destroy_at: string;
  destroyed_at: string;
  deleted_at: string;
  deleted_at_tz: string;
  deleted_at_ago: string;
  created_at: string;
  created_at_tz: string;
  created_at_ago: string;
  updated_at: string;
  updated_at_tz: string;
  updated_at_ago: string;
}

export interface FileListInterface extends Partial<FileListOptionalInterface> {
  id: number;
  full_path: string;
  name_without_prefix: string;
  mime_type: string;
}

export type Logo = FileListInterface & {
  type: string;
  width: number;
  height: number;
};

export type MediaEditBody = {
  action: string;
  data: any;
  method?: 'POST' | 'PATCH' | 'DELETE';
};

// ANCHOR media package types
export type mediaPermissionsTypes =
  | 'rename'
  | 'cut'
  | 'copy'
  | 'remove'
  | 'upload'
  | 'create'
  | 'list';

export interface MediaProviderProps {
  refetch: () => void;
  setCurrentPath: (data: MediaState['currentPath']) => void;
  onSelectFile?: (id: FileListInterface) => void;
  keywords?: Partial<KeywordsTypes>,
  permissions?: {
    file?: mediaPermissionsTypes[];
    folder?: mediaPermissionsTypes[];
  };
}

export type FakeFuncType = () => void;

export interface MediaState {
  currentPath: string;
  selected: string;
  refetch: boolean;
  isLoading: boolean;
  selectToAction: SelectToActionTypes;
  dialogActions: DialogActionsTypes;
}

export interface DialogActionsTypes {
  open: boolean;
  type: string;
  action: string;
  data: any;
}

export interface SelectToActionTypes {
  type: string;
  action: string;
  from: string;
  to: string;
}

export interface MediaContextType {
  data?: MediaListInterface;
  isLoading?: boolean;
  currentPath: string;
  dialogActions: DialogActionsTypes;
  selectToAction: SelectToActionTypes;
  selected: MediaListInterface | string;
  permissions: MediaProviderProps['permissions'];
  keywords?: Partial<KeywordsTypes>,
  handleDelete: FakeFuncType;
  handleCreateFolder: FakeFuncType;
  handleUpload: FakeFuncType;
  handleCloseDialog: FakeFuncType;
  handleCancel: FakeFuncType;
  handlePaste: FakeFuncType;
  handleClickBack: FakeFuncType;
  setIsModal: (data: boolean) => void;
  handleRenameAndCreate: (Name: string) => void;
  handleUploadFile: (file: any) => void;
  handleChangePath: (index: number | false) => void;
  handleSelect: (data: string) => void;
  handleFolderClick: (path: string) => void;
  handleFileClick: (file: MediaListInterface['files'][0]) => void;
  setSelectToAction: (body: SelectToActionTypes) => void;
  setDialogActions: (body: DialogActionsTypes) => void;
  refetch: FakeFuncType;
}

export interface KeywordsTypes {
  copy: string;
  cut: string;
  rename: string;
  refresh: string;
  upload: string;
  'new folder': string;
  'past here': string;
  cancel: string;
  'Are you sure to delete': string;
  remove: string;
  submit: string;
  'file name': string
  'back': string,
  "folder name": string,
  "upload your file": string
}
