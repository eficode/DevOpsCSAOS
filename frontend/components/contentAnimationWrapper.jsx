import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
/**
 * https://www.framer.com/api/motion/types/
 *  */

const duration = 0.3
const delay = 0.1

const variants = {
  initial: {
    // starts invisible
    opacity: 0,
  },
  enter: {
    // becomes visible
    opacity: 1,
    transition: {
      // when using variants, children animations will start after this duration (in seconds)
      duration,
      // delay the animation by this duration (in seconds). Defaults to 0.
      delay,
      // schedule transition with relation to its children
      // (i.e. run this before children transitions)
      when: 'beforeChildren',
    },
  },
  exit: {
    // as the component leaves, it becomes invisible
    opacity: 0,
    transition: { duration },
  },
}

export function ContentAnimationWrapper({ children }) {
  const router = useRouter()
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.asPath}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default ContentAnimationWrapper
