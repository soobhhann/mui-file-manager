# Material Ui File Manager

install

```cli
npm i mui-file-manager
```

```cli
yarn add mui-file-manager
```

## Features

- show files
- show folders
- show images preview and show other formats with icon
- copy, cut, rename, delete **files**
- copy, cut, rename, delete **folders**
- choose permissions for each feature of the files or folders
- choose your own dictionary using keywords props
- handle events and path changing
- loading handler
- **support rtl via theme**
- **support light and dark mode**
- compatible with your **material ui theme**

### Usage and Types

```jsx

import MuiFileManager from "mui-file-manager"

const YourFileManagment = () => {

  const [currentPath, setCurrentPath] = useState('/')

  // ANCHOR data
  const data = {
    '/': [
      folders: [{ name: 'string', full_path: "string", path: "string" }],
      files: [{id: "number", full_path: "string", name_without_prefix: 'string', mime_type: "string"}]
    ],
    "/test": [
      folders: [{ name: 'string', full_path: "string", path: "string" }],
      files: [{id: "number", full_path: "string", name_without_prefix: 'string', mime_type: "string"}]
    ],
  }


  // ANCHOR handlers
  const handleCurrentPath = (url: string) => setCurrentPath(url)

  const handleRefetch = () => /* refetch */

  const fileAction = ({ action: string; data: any; method?: "POST" | "PATCH" | "DELETE" }) => /* file action */

  const folderAction = ({ action: string; data: any; method?: "POST" | "PATCH" | "DELETE" }) => /* file action */

  const onSelectFile = (file: {id: "number", full_path: "string", name_without_prefix: 'string', mime_type: "string"}) => /* handle select file */

  return (
    <MuiFileManager
      currentPath={currentPath}
      data={data[currentPath]}
      isLoading={isLoading}
      refetch={handleRefetch}
      setCurrentPath={handleCurrentPath}
      onFileAction={fileActions}
      onFolderAction={folderActions}
      onSelectFile={onSelectFile}
      permissions={ {
              file: [ "rename", "cut", "copy", "remove", "upload", "create", "list"],
              folder: [ "rename", "cut", "copy", "remove", "upload", "create", "list"],
            }
      }
      keywords={{
            copy: "string",
            cut: "string",
            rename: "string",
            refresh: "string",
            upload: "string",
            'new folder': "string",
            'past here': "string",
            cancel: "string",
            'Are you sure to delete': "string",
            remove: "string",
            submit: "string",
            'file name': "string",
            'back': "string"
        }}
    />
  );
};

```
