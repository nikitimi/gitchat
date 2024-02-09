import { useState } from "react"
import CreatePostComponent from "~/components/CreatePostComponent"
function PostPage() {
  const [modalVisibility, setModalVisibility] = useState(false)

  return (
    <>
      <button
        className=" bg-black text-white rounded-sm"
        onClick={() => setModalVisibility(true)}
      >
        addpost
      </button>
      <CreatePostComponent
        isVisible={modalVisibility}
        setVisibility={() => setModalVisibility(false)}
      />
    </>
  )
}

export default PostPage
