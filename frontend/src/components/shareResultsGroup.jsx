import React from 'react'
import styled from 'styled-components'
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'

const ShareButtonGrouper = styled.div`
  button {
    margin-left: 10px;
    margin-right: 10px;
  }
`
// Linked In does not support any other parameters than url: https://github.com/nygardk/react-share/issues/385
const ShareResultsGroup = ({ text, userPoints, maxPoints, baseUrl }) => {
  const headerToShare = `According to our DevOps Self-Assessment Survey: ${text} You received ${userPoints} / ${maxPoints} points!`

  return (
    <ShareButtonGrouper>
      <LinkedinShareButton url={baseUrl}>
        <LinkedinIcon size={35} round />
      </LinkedinShareButton>

      <TwitterShareButton title={headerToShare} url={baseUrl}>
        <TwitterIcon size={35} round />
      </TwitterShareButton>

      <FacebookShareButton quote={headerToShare} url={baseUrl}>
        <FacebookIcon size={35} round />
      </FacebookShareButton>
    </ShareButtonGrouper>
  )
}

export default ShareResultsGroup
