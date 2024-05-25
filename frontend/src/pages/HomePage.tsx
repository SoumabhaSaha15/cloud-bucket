import React from "react";
import * as CUI from  "@chakra-ui/react";
import * as FM from 'framer-motion'

const HomePage:React.FC = () => {
  return (
    <CUI.Box
      as={FM.motion.div}
      height={window.innerHeight*0.7+'px'}
      width={window.innerWidth*0.7+'px'}
      bg='purple.400'
      drag='x'
      dragConstraints={{ left: -100, right: 100 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition='0.5s linear'
      // not work: transition={{ transition: "0.5", ease: "linear" }}
    />
  )
}
export default HomePage;