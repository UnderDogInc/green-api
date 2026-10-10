import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slide1 from '../../../assets/images/sr-slider/slide-1.webp'
import Slide2 from '../../../assets/images/sr-slider/slide-2.webp'

const SliderStack = [Slide1, Slide2]

export function QrGuideSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const changeSlide = (direction: -1 | 1) => {
    setCurrentIndex((prev) => (prev + direction + SliderStack.length) % SliderStack.length)
  }

  return (
    <div
      className={`relative flex max-h-[300px] w-full justify-center gap-4 overflow-hidden rounded-xl`}
    >
      <button
        className={'cursor-pointer'}
        type="button"
        onClick={() => changeSlide(-1)}
        aria-label="Предыдущее фото"
      >
        <ChevronLeft size={24} />
      </button>
      <img
        src={SliderStack[currentIndex]}
        alt={`слайд ${currentIndex + 1}`}
        className="h-full w-fit object-contain"
      />

      <button
        className={'cursor-pointer'}
        type="button"
        onClick={() => changeSlide(1)}
        aria-label="Следующее фото"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
