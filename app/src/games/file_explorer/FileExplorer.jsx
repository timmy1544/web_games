import { fileData } from './mockData';
import Entry from './Entry';
 
const FileExplorer = () => {
    return (
        <div>{
            fileData.map((file, index) => (
                <Entry file={file} key={index} level={0}/>
            ))
        }</div>
    )
}
export default FileExplorer;