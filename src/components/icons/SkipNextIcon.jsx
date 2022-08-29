const SkipNextIcon = (props) => {
    const { className = '', onClick = () => { } } = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`ionicon ${className}`} onClick={onClick} viewBox="0 0 512 512"><title>Play Skip Forward</title><path d="M400 64a16 16 0 00-16 16v136.43L151.23 77.11a35.13 35.13 0 00-35.77-.44C103.46 83.47 96 96.63 96 111v290c0 14.37 7.46 27.53 19.46 34.33a35.14 35.14 0 0035.77-.45L384 295.57V432a16 16 0 0032 0V80a16 16 0 00-16-16z" /></svg>
    )
}

export default SkipNextIcon