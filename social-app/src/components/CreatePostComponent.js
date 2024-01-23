import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/createpost.module.css";
import ImageIcon from "../assets/ImageIcon";
function CreatePostComponent({ isVisible, setVisibility }) {
	const [images, setImages] = useState([]);
	const modal = useRef();

	const handleImageInput = (e) => {
		try {
			const files = Array.from(e.target.files);
			files.forEach((file) => {
				if (!file.type.startsWith("image/")) {
					throw new Error("Invalid file type");
				}
				setImages((prevFiles) => [...prevFiles, file]);
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (isVisible) {
			modal.current?.showModal();
		} else {
			modal.current?.close();
		}
		console.log(images);
	}, [isVisible, images]);
	return (
		<dialog ref={modal} className={styles.dialogBox}>
			<form className={styles.mainContainer}>
				<textarea name="content" placeholder="What's on your mind?" className={styles.textArea}></textarea>

				<div className={styles.fileInputContainer}>
					<ul className={styles.filesContainer}>
						<div className=" w-[60px] h-[60px] border">
							<ImageIcon style={{ width: "100px", height: "100px", border: "1px solid black" }} />
							<span>image.jpg</span>
						</div>
					</ul>

					<input type="file" accept="image/*" className={styles.fileInput} onChange={handleImageInput} />
				</div>
			</form>
		</dialog>
	);
}

export default CreatePostComponent;
