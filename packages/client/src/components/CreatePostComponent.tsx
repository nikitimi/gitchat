import { type ChangeEvent, useEffect, useRef, useState } from "react"
import styles from "~/styles/createpost.module.css"
import ImageIcon from "~/assets/Image.svg?react"

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
    <dialog ref={modal} className={styles.dialogBox}>
      <form className={styles.mainContainer}>
        <textarea
          name="content"
          placeholder="What's on your mind?"
          className={styles.textArea}
        ></textarea>

        <div className={styles.fileInputContainer}>
          <ul className={styles.filesContainer}>
            <div className="w-14 h-14 border rounded-sm shadow-sm">
              <ImageIcon className="fill-blue-400 text-white" />
              <span>image.jpg</span>
            </div>
          </ul>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageInput}
          />
        </div>
      </form>
    </dialog>
  )
}

export default CreatePostComponent
