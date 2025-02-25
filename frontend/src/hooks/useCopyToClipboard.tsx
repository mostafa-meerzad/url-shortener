import { useState } from "react"
import toast from "react-hot-toast"

const useCopyToClipBoard = ()=>{

    const [isCopied, setIsCopied] = useState(false)

    const copy = async (text:string) => {
        try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        toast.success("Copied to clipboard!")
        setTimeout(()=>{setIsCopied(false)}, 2000)
            
        } catch (error) {
            toast.error("Failed to copy!")
            console.log("Failed to copy! ", error)
        }
    }
    return { isCopied, copy}
}

export default useCopyToClipBoard