import { IconButton } from "@mui/material"
import './Section.css'
function Section({Icon,title ,color,selected}){
    return(
        <div className={`section  ${selected && "section--selected"}`} style={{borderBottom:`3px solid ${color}`,color:`${selected && color}`}}>
            <IconButton>
            <Icon />
            <h4>{title}</h4>
            </IconButton>
        </div>
    )
}
export default Section