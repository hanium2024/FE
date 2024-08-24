import Web3 from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';
import {ADMIN_PRIVATE_KEY, INFURA_ENDPOINT,} from 'react-native-dotenv';
import {getAccessToken} from '../storage/auth';
import {getUserApi} from '../api/userApi';

console.log(INFURA_ENDPOINT);
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_ENDPOINT));

const contractAddress = contractAbi.networks["11155111"].address;
console.log(contractAddress)
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const account = web3.eth.accounts.wallet.add(ADMIN_PRIVATE_KEY);
web3.eth.defaultAccount = web3.eth.accounts[0];



// 관리자 계정
export const getAccount = () => {
  return account[0].address;
};


export const getNfts = async () => {
  contract.methods.getNfts().call({
    from: "0xFe0dcCCdFcc23181b98807C852a04a209b4ece9b",
  })
      .then(console.log)
      .catch(errors => console.log(errors));
};

/**
 * 강아지 정보 하나
 * @returns {Promise<{image: *, name: *, description: *, attributes: [{value: *, trait_type: string},{display_type: string, value: number, trait_type: string}]}>}
 */
export const getDogNft = async () => {
  const accessToken = await getAccessToken();

  // 사용자 정보 가져오기
  const userInfo = await getUserApi(accessToken);
  const userAddress = userInfo.data.address;
  try {
    const result = await contract.methods.getNfts().call({
      from: userAddress,
    });

    // 0번째 값만 변환하여 반환
    const nftData = result[0];

    // 주어진 배열을 객체 형식으로 변환
    const nftObject = {
      description: nftData[7], // "귀여움"
      image: nftData[8], // "image URL"
      name: nftData[2], // "해피"
      attributes: [
        {
          trait_type: "Gender",
          value: nftData[5], // "M"
        },
        {
          display_type: "date",
          trait_type: "BirthDate",
          value: Math.floor(new Date(nftData[4]).getTime() / 1000), // "2021-10-01" -> epoch time
        },
      ],
    };

    return nftObject;
  } catch (errors) {
    console.log(errors);
    throw errors;
  }
};

// 날짜 문자열을 epoch time으로 변환하는 함수
const convertDateToEpoch = (dateString) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
}


const createNftJsonString = (name, image, birthDate, gender) => {
  const nftObject = {
    name: name,
    image: image,
    attributes: [
      {
        trait_type: "Gender",
        value: gender
      },
      {
        display_type: "date",
        trait_type: "BirthDate",
        value: convertDateToEpoch(birthDate)
      }
    ]
  };

  return JSON.stringify(nftObject, null, 2); // JSON 객체를 문자열로 변환, 들여쓰기로 포맷팅
}


/**
 * NFT 생성
 * @param name
 * @param breed
 * @param birthDate
 * @param gender
 * @param neutraled
 * @param description
 * @param image
 * @returns {Promise<string>}
 */
export const createDogInfo = async (
    name,
    breed,
    birthDate,
    gender,
    neutraled,
    description,
    image
) => {
  const accessToken = await getAccessToken();

  // 사용자 정보 가져오기
  const userInfo = await getUserApi(accessToken);
  const userAddress = userInfo.data.address;

  // Admin 계정 설정 (가스비 지불 계정)
  const adminAddress = account[0].address;

  // NFT를 위한 URI 생성
  const tokenUri = createNftJsonString(name, image, birthDate, gender);
  console.log(tokenUri);

  // NFT 생성 트랜잭션 준비
  const tx = contract.methods.createDogInfo(
      name,
      breed,
      birthDate,
      gender,
      neutraled,
      description,
      image,
      tokenUri,
      userAddress // nft 발급 받게 되는 user
  );

  // 가스 계산
  const gas = await tx.estimateGas({ from: adminAddress });
  console.log(gas);

  // 트랜잭션 데이터 인코딩
  const data = tx.encodeABI();

  // 트랜잭션 데이터 생성 (Admin이 가스비 지불)
  const txData = {
    from: adminAddress,   // 가스비를 지불할 Admin 계정
    to: contractAddress,
    data: data,
    gas,
  };

  // 트랜잭션 전송
  const receipt = await web3.eth.sendTransaction(txData);
  // console.log('Transaction successful with hash:', receipt.transactionHash);
  console.log(receipt)

  return tokenUri;
};
