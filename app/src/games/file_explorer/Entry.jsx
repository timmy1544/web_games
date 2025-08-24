import './Entry.scss'
import { useState } from 'react';
const Entry = ({
    file,
    level
}) => {
    const {name, children} = file;
    const [isExpand, setIsExpand] = useState(false);

    const handleExpandClick = () => {
        setIsExpand(prev => !prev)
    }

    const hasChildren = children && children.length

    const suffixRenderer = () => {
        if (!hasChildren) {
            return
        }
        return <div>{isExpand ? '[-]' : '[+]'}</div>
    }
    return (
        <div style={{paddingLeft: `${level * 10}px`}}>
            <div className={`entry__name ${hasChildren ? 'entry__name--canExpand' : null}`} onClick={handleExpandClick}>
                {name}
                {suffixRenderer()}
            </div>
            {(isExpand && hasChildren) && children.map((child, index) => (
                <Entry file={child} key={index} level={level + 1}/>
            ))}
        </div>
    )
}

export default Entry;