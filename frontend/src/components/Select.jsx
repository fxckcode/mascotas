import { forwardRef } from 'react'

const Select = forwardRef(function Select(props, ref) {
  return (
    <select ref={ref} {...props} className={'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C683EA] focus:border-[#C683EA] sm:text-sm ' + props.className } >
        {props.children}
    </select>
  )
})

export default Select