import React, { useMemo, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default React.memo(function EditorComp({ removeImage, onChange, name, className, readOnly, style, onBlur }) {

    let toolbarOptions = useMemo(() => {
        return [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ align: [] }],
            [{ direction: "rtl" }], // text direction

            [{ script: "sub" }, { script: "super" }], // superscript/subscript

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            removeImage ? [] : ['images']
        ]
    }, [removeImage])

    const handleChange = useCallback((value) => {
        onChange(value, name)
    }, [])


    return <ReactQuill
        id={name}
        value={value}
        className={className ? className : undefined}
        style={style ? style : undefined}
        modules={{ toolbar: readOnly ? [] : toolbarOptions }}
        onChange={(value) => handleChange(value)}
        onBlur={onBlur ? onBlur : undefined}
        readOnly={readOnly ? true : false}
    />
})