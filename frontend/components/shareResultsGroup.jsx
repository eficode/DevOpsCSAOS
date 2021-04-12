import React from 'react'
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'

// this creates a linkedIn + twitter share buttons for url sharing. placeholder icon.
const ShareResultsGroup = ({ resultText, userResult, maxResult }) => {
  const headerToShare = `According to our DevOps Self-Assessment Survey: ${resultText} You received ${userResult} / ${maxResult} points!`
  return (
    <div>
      <LinkedinShareButton url="https://ohtu-csaos-staging.herokuapp.com/">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton url="https://ohtu-csaos-staging.herokuapp.com/">
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton quote={headerToShare} url="https://ohtu-csaos-staging.herokuapp.com/">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  )
}

export default ShareResultsGroup
