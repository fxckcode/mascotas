import { forwardRef } from 'react'

const TextArea = forwardRef(function TextArea(props, ref) {
    return (
        <textarea ref={ref} {...props} className={'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C683EA] focus:border-[#C683EA] sm:text-sm ' + props.className} >{
            props.children
        }</textarea>
    )
})

export default TextArea