import { ChangeEvent, useEffect, useRef, useState } from "react"
import "~/styles/createpost.module.css"
import ImageIcon from "~/assets/ImageIcon"

type CreatePostComponentProps<T> = {
  isVisible: T
  setVisibility: (value: T) => void
}

function CreatePostComponent<T>({ isVisible }: CreatePostComponentProps<T>) {
  const [images, setImages] = useState<File[]>([])
  const modal = useRef<HTMLDialogElement | null>(null)

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files
      if (files === null) return

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          throw new Error("Invalid file type")
        }
        setImages((prevFiles) => [...prevFiles, file])
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isVisible) {
      modal.current?.showModal()
    } else {
      modal.current?.close()
    }
    console.log(images)
  }, [isVisible, images])

  return (
    <dialog ref={modal} className="dialogBox">
      <form className="mainContainer">
        <textarea
          name="content"
          placeholder="What's on your mind?"
          className="textArea"
        ></textarea>

        <div className="fileInputContainer">
          <ul className="filesContainer">
            <div className=" w-[60px] h-[60px] border">
              <ImageIcon
              // style={{
              //   width: "100px",
              //   height: "100px",
              //   border: "1px solid black",
              // }}
              />
              <span>image.jpg</span>
            </div>
          </ul>
          <input
            type="file"
            accept="image/*"
            className="fileInput"
            onChange={handleImageInput}
          />
        </div>
      </form>
    </dialog>
  )
}

export default CreatePostComponent
