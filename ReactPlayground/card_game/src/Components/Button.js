import './Button.css'

export default function Button({children, style, onClick, disabled=false}) {
	return <button className="btn-default" style={style} onClick={onClick} disabled={disabled}>{children}</button>
}