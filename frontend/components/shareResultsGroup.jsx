import React from 'react'

// this creates a linkedIn + twitter share buttons for url sharing. placeholder icon.
const ShareResultsGroup = ({  }) => (
  <>
    <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
    <script type="IN/Share" data-url="https://www.linkedin.com"></script>
    <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=Hello%20world">
        Tweet
    </a>
  </>
)
  
export default ShareResultsGroup
