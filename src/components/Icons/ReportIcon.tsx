import React from 'react';
import Svg, {Defs, G, Path, Rect, ClipPath} from 'react-native-svg';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

const ReportIcon = (props: SvgIconProps) => (
  <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
    <G id="mingcute:report-fill" clipPath="url(#clip0_1491_1563)">
      <G id="Group">
        <Path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9973 8.75049C16.9377 8.75042 18.8027 9.50245 20.2004 10.8486C21.598 12.1947 22.4195 14.0301 22.4923 15.9692L22.4973 16.2505V25.0005H23.7473C24.0659 25.0008 24.3723 25.1228 24.604 25.3415C24.8357 25.5603 24.9751 25.8592 24.9937 26.1772C25.0124 26.4953 24.9089 26.8085 24.7044 27.0528C24.5 27.2971 24.2099 27.4541 23.8935 27.4917L23.7473 27.5005H6.24727C5.92867 27.5001 5.62223 27.3781 5.39056 27.1594C5.15889 26.9407 5.01948 26.6418 5.00081 26.3237C4.98214 26.0057 5.08562 25.6925 5.29011 25.4482C5.49459 25.2039 5.78465 25.0469 6.10102 25.0092L6.24727 25.0005H7.49727V16.2505C7.49727 14.2614 8.28745 12.3537 9.69397 10.9472C11.1005 9.54066 13.0082 8.75049 14.9973 8.75049ZM13.926 14.983L12.0623 18.088C11.9472 18.2796 11.8851 18.4983 11.8822 18.7217C11.8793 18.9452 11.9358 19.1654 12.0459 19.3599C12.156 19.5544 12.3157 19.7161 12.5088 19.8287C12.7018 19.9412 12.9213 20.0005 13.1448 20.0005H14.6648L13.926 21.2317C13.7624 21.5155 13.7167 21.8523 13.7988 22.1694C13.8809 22.4866 14.0842 22.7588 14.365 22.9276C14.6459 23.0963 14.9817 23.1481 15.3003 23.0717C15.6189 22.9953 15.8947 22.797 16.0685 22.5192L17.9323 19.413C18.0473 19.2214 18.1095 19.0027 18.1124 18.7793C18.1152 18.5558 18.0588 18.3356 17.9487 18.1411C17.8386 17.9466 17.6789 17.7848 17.4858 17.6723C17.2927 17.5597 17.0733 17.5005 16.8498 17.5005H15.3298L16.0685 16.2692C16.2322 15.9854 16.2779 15.6487 16.1958 15.3316C16.1136 15.0144 15.9103 14.7422 15.6295 14.5734C15.3487 14.4047 15.0129 14.3529 14.6943 14.4293C14.3757 14.5056 14.0998 14.704 13.926 14.9817V14.983ZM6.92477 6.42424L7.04227 6.52799L7.92602 7.41174C8.15021 7.63669 8.28037 7.93853 8.29006 8.25597C8.29975 8.57341 8.18826 8.88263 7.97821 9.12084C7.76817 9.35904 7.47533 9.50837 7.15918 9.53849C6.84303 9.5686 6.52726 9.47725 6.27602 9.28299L6.15852 9.17924L5.27477 8.29549C5.05059 8.07054 4.92043 7.7687 4.91074 7.45126C4.90105 7.13382 5.01254 6.8246 5.22259 6.58639C5.43263 6.34818 5.72546 6.19886 6.04162 6.16874C6.35777 6.13862 6.67353 6.22997 6.92477 6.42424ZM24.7198 6.52799C24.9541 6.7624 25.0858 7.08028 25.0858 7.41174C25.0858 7.74319 24.9541 8.06108 24.7198 8.29549L23.836 9.17924C23.7207 9.29863 23.5828 9.39385 23.4303 9.45936C23.2778 9.52488 23.1138 9.55936 22.9478 9.5608C22.7818 9.56224 22.6172 9.53062 22.4636 9.46777C22.31 9.40491 22.1704 9.3121 22.053 9.19473C21.9357 9.07737 21.8428 8.9378 21.78 8.78418C21.7171 8.63056 21.6855 8.46596 21.687 8.29999C21.6884 8.13401 21.7229 7.96999 21.7884 7.81748C21.8539 7.66498 21.9491 7.52705 22.0685 7.41174L22.9523 6.52799C23.1867 6.29365 23.5046 6.16201 23.836 6.16201C24.1675 6.16201 24.4854 6.29365 24.7198 6.52799ZM14.9973 2.50049C15.3288 2.50049 15.6467 2.63218 15.8812 2.8666C16.1156 3.10103 16.2473 3.41897 16.2473 3.75049V5.00049C16.2473 5.33201 16.1156 5.64995 15.8812 5.88437C15.6467 6.11879 15.3288 6.25049 14.9973 6.25049C14.6658 6.25049 14.3478 6.11879 14.1134 5.88437C13.879 5.64995 13.7473 5.33201 13.7473 5.00049V3.75049C13.7473 3.41897 13.879 3.10103 14.1134 2.8666C14.3478 2.63218 14.6658 2.50049 14.9973 2.50049Z"
          fill="white"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_1491_1563">
        <Rect width="30" height="30" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ReportIcon;
