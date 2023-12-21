import './Button.css'

export default function Button({children, style, click}) {
	return <button class="btn-default" style={style} onClick={click}>{children}</button>
}