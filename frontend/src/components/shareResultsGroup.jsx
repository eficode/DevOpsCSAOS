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
    margin: 3px;
  }
`
// Linked In does not support any other parameters than url: https://github.com/nygardk/react-share/issues/385
const ShareResultsGroup = ({ text, userPoints, maxPoints }) => {
  const headerToShare = `According to our DevOps Self-Assessment Survey: ${text} You received ${userPoints} / ${maxPoints} points!`

  return (
    <ShareButtonGrouper>
      <LinkedinShareButton url="https://ohtu-csaos-staging.herokuapp.com/">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton title={headerToShare} url="https://ohtu-csaos-staging.herokuapp.com/">
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton quote={headerToShare} url="https://ohtu-csaos-staging.herokuapp.com/">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </ShareButtonGrouper>
  )
}

export default ShareResultsGroup
