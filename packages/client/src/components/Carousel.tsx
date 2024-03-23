import { useEffect, useState } from "react"
import styles from "~/styles/posts.module.css"

const Carousel = () => {
  const [transformValue, setTransformValue] = useState("translate(0%)")
  const [currentIndex, setCurrentIndex] = useState(0)
  const imgUrl = [
    "https://media.istockphoto.com/id/1497624425/photo/summer-beach-vacation-concept-young-woman-with-hat-relaxing-with-her-arms-raised-to-her-head.webp?s=2048x2048&w=is&k=20&c=t-BKPxu15erx0l6bJLXUxtsaf2L_-DziyDmR0-u3KiM=",
    "https://media.istockphoto.com/id/1465749930/photo/blank-beige-brown-cement-curve-counter-podium-with-texture-soft-beautiful-dappled-sunlight.webp?s=2048x2048&w=is&k=20&c=_8_z2wLeJfdSKCAg9elgkQKQ3k-8lNPaIRsPRTXY0LY=",
    "https://images.pexels.com/photos/19685615/pexels-photo-19685615/free-photo-of-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/19685615/pexels-photo-19685615/free-photo-of-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/19685615/pexels-photo-19685615/free-photo-of-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1699155758832-a80cdffc17e7?q=80&w=1371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681803606255-cb66b02f2b56?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  const handleNextImage = () => {
    if (currentIndex < imgUrl.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }
  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(imgUrl.length - 1)
    }
  }
  useEffect(() => {
    setTransformValue(`translate(${(currentIndex / imgUrl.length) * -100}%)`)
  }, [currentIndex])

  return (
    <>
      <div className={styles.imgContainer}>
        <div className={styles.imgCarousel}>
          <div
            className={styles.imgSlider}
            style={{
              width: `${imgUrl.length * 100}%`,
              transform: transformValue,
            }}
          >
            {imgUrl &&
              imgUrl.map((image, index) => {
                return (
                  <section className={styles.section} key={index}>
                    <img
                      src={image}
                      alt={`image${index}`}
                      className="max-w-full max-h-full"
                    />
                  </section>
                )
              })}
          </div>
        </div>
        <Button text="previous" onClick={handlePreviousImage} />
        <Button text="next" onClick={handleNextImage} />
      </div>
    </>
  )
}

type ButtonProps = {
  text: "next" | "previous"
  onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.buttons} ${
        text === "next" ? styles.next : styles.previous
      }`}
    >
      {text}
    </button>
  )
}

export default Carousel
