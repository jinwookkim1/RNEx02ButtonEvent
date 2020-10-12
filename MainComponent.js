import React, {Component} from 'react';
import { View, Button, StyleSheet, Alert, Text, Image } from 'react-native';

class MainComponent extends Component{

    //4)실습에 사용하는 멤버변수선언
    //let text;//ERROR : 모든 자바스크립트 문법에서 class안에 멤버변수는 let,const로 만드는 것이 아니라 constructor(생성자)안에서 this.키워드로 만들어야 함.
    //생성자 : MainComponent클래스가 만들어질 때 자동으로 실행되는 메소드
    constructor(){
        //상속받았을때는 반드시 부모 클래스의 생성자를 호출하는 super()호출이 있어야함. [ 생략하면 ERROR ]
        super();
        //멤버변수선언  
        //let text; //이건 지역변수임!!!      
        this.text="Hello"; //초기값을 그냥 'Hello'로...


        //5)실습에 사용할 state 키워드 사용
        // Component클래스 안에서 멤버변수는 무조건 state로 만든다고 생각하는 것이 좋을 수도 있음. 
        // state객체 생성 [사실 이건 this.state변수를 지금 생성하는 것이 아니라 값을 대입하는 것임, 즉, 원래부터 Component클래스는 멤버로 state가 존재하고 있음.]
        this.state= {
            text: "Hello",

            //6)실습에서 사용할 멤버변수
            img: require( './images/moana01.jpg' ),            
        };
    }

    //#### 참고. 멤버만드는 또 다른 방법 ######################
    // 클래스 안에서 this. 없이 그냥 변수 선언 값 대입
    // state= {text:"Hello"};
    // #############################################################   


    render(){
        return (
            //1) 기본적인 버튼 클릭이벤트 반응하기
            // 스타일이 없으면 배치가 이상하니까 스타일링
            // onClick속성은 없음!!
            // 버튼에 onClick속성사용하듯이 onPress속성을 통해 실행할 함수객체를 지정하여 이벤트에 반응하기            
            // 실행할 함수를 전역함수로 만들어보기!! - MainComponent클래스 밖에 정의
            <View style={ style.root }>
                {/* 버튼에 들어가는 글씨는 반드시 title속성을 이용해야함 text node로 넣을 수 없음:error */}
                <Button title="button" onPress={ clickBtnFunction } ></Button>
                {/* 이렇게{}안에 함수객체명이 아니라 함수호출문 ()를 쓰면 onPress상황과 상관없이 함수가 실행됨 : 이건 이벤트객체를 등록하는 것이 아님*/}
                {/* <Button title="button" onPress={ clickBtnFunction() } ></Button> */}

                {/* 저 밑에서 화살표함수 표기법에 대한 실습까지 한 후에  */}
                {/* 전역함수를 별도로 만들지 않고 곧바로 익명함수객체로 삽입하기 */}
                {/* <Button title="button" onPress={ function(){ Alert.alert('Clicked!!!')} } ></Button> */}
                
                {/* 화살표함수 표기법으로 변경하면... */}
                {/* <Button title="button" onPress={ ()=>{ Alert.alert('Clicked!!!')} } ></Button> */}
            </View>

            //2) 앞으로의 앱코딩과정에서 1)방법처럼 전역함수를 사용하는 것은 권장하지 않음. why? 함수명 관리및 구분의 어려움 & 메모리 효율성            
            // <View style={ style.root }>
            //     {/* {/* 주의!! 멤버메소드는 반드시 this. 키워드를 사용해야함!!! */}
            //     <Button title="button" onPress={ this.clickBtn } ></Button>
            // </View>

            //3) 버튼 클릭하여 Text컴포넌트의 값 변경해보기!!!
            // 방법이 기존과 많이 다름.. -- 컴포넌트객체를 참조하여 제어하는 방식이 아닌...binding방식으로 데이터를 보여줌.
            // <View style={ style.root }>
            //     <Button title="button" onPress={ this.changeTextByclickBtn } ></Button>

            //     {/* Text컴포넌트가 보여줄 내용물이 고정된 글씨가 아니라 바뀌게 되는 값이어서 변수로 글씨 설정 : 우선 전역변수로 저 아래에...*/}
            //     <Text style={style.plainText}> {text} </Text>                
            // </View>

            //4) 우선 위 3)방법처럼 전역변수를 사용하는 것이 좋지 않다고 했으니 멤버변수로..변경
            // <View style={ style.root }>
            //     <Button title="button" onPress={ this.changeMemberTextByclickBtn } ></Button>

            //     {/* 해결방법 1. bind()메소드 이용하기 */}
            //     {/* 이렇게 매개변수로 MainComponent의 this를 전달해주면 .. 그 메소드안에서는 this를  MainComponent의 this로 인식함*/}
            //     <Button title="button" onPress={ this.changeMemberTextByclickBtn.bind(this) } ></Button>

            //     {/* 해결방법 2. 화살표함수(Arrow Function) 이용하기 */}
            //     {/* 위 처럼 함수객체를 만들어서 객체명으로 주지말고 화살표함수로 만들어주면 this문제는 자동 해결됨 */}
            //     <Button title="button" onPress={ this.changeMemberTextByclickBtnViaArrow } ></Button>

            //     {/* 멤버변수로 값 설정 : 저 위에  constructor(생성자)를 통해 */}
            //     <Text style={style.plainText}> {this.text} </Text>                
            // </View>

            //5) 어찌되었든 ... 결국 Text컴포넌트의 글씨는 변경되지 않음...[화면을 갱신하라는 표현이 명령이 없었으므로..]
            // 되게 하려면 React의 특별한 멤버변수 사용기법을 알아야 함.
            // state라는 특별한 키워드가 있음..
            // 이 컴포넌트의 상태(state)값을 가지고 있는 멤버객체라고 보면 되며
            // 이 state의 값이 변경되면 자동 render()함수가 재실행되어 화면갱신이 가능해짐!!
            // <View style={ style.root }>
            //     <Button title="button" onPress={ this.changeTextByState.bind(this) } ></Button>
            //     {/* Text컴포넌트가 보여줄 값을 state객체를 이용하여 설정*/}
            //     <Text style={style.plainText}> {this.state.text} </Text>               
            // </View>

            //6) 한김에 버튼클릭하여 이미지 변경하는 것도 추가하기..
            // <View style={ style.root }>
            //     <Button title="button" onPress={ this.changeTextByState } ></Button>                
            //     <Text style={style.plainText}> { this.state.text } </Text>


            //     <Button title="change image" color="orange" onPress={ this.changeImage }></Button>

            //     {/* <Image source={require('./images/moana01.jpg')} style={style.img}></Image> */}
            //     {/* 이미지의 source도 변경되어야 하므로..state를 통해 멤버변수로.. */}
            //     {/* 참고로 멤버변수에 require( './images/moana01.jpg' )를 통째로.. */}
            //     <Image source={ this.state.img } style={style.img}></Image>
                
            // </View>
        );
    }

    //2)실습에서 사용할 MainComponent클래스의 멤버메소드
    //function clickBtn(){ }//ERROR - class문법안에서 멤버메소드를 만들때는 funcion이라는 글씨사용 금지
    clickBtn(){
        Alert.alert('CLICKED BUTTON!!!');
    }

    //3)실습에서 사용할 멤버메소드
    changeTextByclickBtn(){
        //Text컴포넌트를 참조하여 제어하는 것이 아니라... 
        //TextComponent가 보여주는 값( 전역변수 : text) 를 변경
        text="Nice to meet you.";
        Alert.alert('Change Test : '+ text);
        //변경된 글씨를 Text컴포넌트가 보여주고 있는 text라는 전역변수에 넣어도 Text의 값이 갱신되지는 않음.
        //그러고 보니 전역변수보다는 멤버변수를 사용하라고 했죠??        
    }

    //4)실습에서 사용할 멤버메소드
    changeMemberTextByclickBtn(){
        //TextComponent가 보여주는 값( 멤버변수 : this.text)를 변경
        this.text="Good React Native."; // ERROR - why? 여기서의 this가 MainComponent 클래스가 아니라 changeMemberTextByclickBtn()메소드 본인객체를 지칭하므로..

        //this가 누구인지 알아보기 위해 this.text 변수값 읽어보기
        Alert.alert('Change Test : '+ this.text);
        // 위 결과 undefined가 나옴..이유???
        // 지금 이 changeMemberTextByclickBtn()함수가 onPress의 콜백으로 익명함수객체로 되어서
        // 익명객체는 일종의 inner클래스가 되고 MainComponent가 Outer클래스가 됨.
        // 그러므로 익명객체안에서 this는 outer인 MainComponent의 멤버 this가 아니라
        // 익명(함수)객체의 멤버 this로 되면서 정의되지 않은 멤버변수 this.text로 인해
        // 'undefined'가 나옴...

        //자바처럼 .. [ MainComponent.this.text ]는 안됨!!!!!!
        //해결방법 1. bind(this)메소드 이용
        //해결방법 2. 화살표함수 이용..
    } 

    //화살표함수(ArrayFunctions)으로 멤버메소드를 만들면 this는 outer의 this가 됨
    changeMemberTextByclickBtnViaArrow=()=>{
        this.text="Good Arrow Functions!!!";
        Alert.alert('Change Test : '+ this.text);

        //어찌되었든 ... 결국 Text컴포넌트의 글씨는 변경되지 않음...[화면을 갱신하라는 표현이 명령이 없었으므로..]    
        //화면갱신 명령이 없는 것은 아니지만 권장하지 않음.
        //this.forceUpdate();    //re-render()호출 함수
    }


    //5)실습에서 사용할 멤버메소드
    // changeTextByState(){
    //     //state객체의 값 변경은 setState()메소드 사용- 객체이므로 {}가 필요함.
    //     this.setState( {text:"Nice State Object!!!"}  );//Error : 이유?? this.가 누구??
    //     //해결방법...아래처럼 화살표함수로..메소드들..
    // }
    changeTextByState= ()=>{
         ////주의!!!!!
        //this.state.text= 'Nice'; //이렇게 값을 넣으면 값은 대입되지만 state가 갱신되었다는 것을 Component가 인지하지 못해 화면이 자동 갱신되지 않음.

        this.setState( {text:"Nice State Object!!!"}  );
    }

    // **** 종합해보면... ********************************************************
    // 멤버변수는 state를 이용하고..
    // 멤버메소드는 화살표함수를 이용하는 것이 편하게 앱을 제작하는 기법이라고 볼수 있음 
    // ***************************************************************************


    //6)실습에서 사용할 멤버메소드[화살표함수사용]
    changeImage=()=>{     
        //이미지값을 바꿀대는 변수에 require( './images/moana01.jpg' )를 통째로..   
        this.setState( {img: require("./images/moana02.jpg")} );   
        
        //다른 그림으로 바꿀때도 통째로 해야함.
        // this.setState( {img: require("./images/moana0"+num+".jpg")} );   //이런식으로 경로를 문자열결합으로 처리하면 동작안함!!

        //여러그림을 차례로 바꾸려면..
        //배열로 그림경로를 저장하고 배열의 인덱스를 바꾸어서 지정하는 방법 권장!! - [ 이건 Image 컴포넌트 수업때 실습할 것임]
    } 

}//MainComponent class...



//1)실습에서 사용할 전역함수
function clickBtnFunction(){
    //경고창 보이기
    //Alert.alert();//  'ok'버튼만 있음.  
    Alert.alert('PRESSED BUTTON!!!');
}

// 1.1)자바 스크립트에서는 함수도 객체이므로 아래처럼 객체 참조하듯이 변수에 넣을 수도 있음.
// 더 자주 사용되는 방식임....참조을 바꿀 수 있는 이점이 있어서...
// let clickBtnFunction= function(){
//     Alert.alert('PRESSED BUTTON!!!');
// }

// 1.2)두꺼운 화살표함수 표기법(Arrow functions)이라는 것이 있음.- 요즘 함수형 언어에서 많이 사용 [java언어의 람라식표기법임]
// function이라는 글씨를 지우고 ()와 {}사이에 => 화살표 사용
// 파라미터가 1개라면 ()조차도 생략이 가능함.
// let clickBtnFunction= ()=>{
//     Alert.alert('PRESSED BUTTON!!!');
// }

//위 처럼 함수의 실행문이 짧고 간결하다면 별도로 전역함수로 만들지 않고..
// JSX에서 onPress= {} 안에 곧바로 함수정의문을 삽입하여 사용할 수도 있음.


//3)실습에서 사용할 전역변수
let text="Hello";


//스타일객체
const style= StyleSheet.create({
    root:{
        //backgroundColor:'lightgreen',
        flex : 1,
        padding : 16,
    },

    //2)실습에 사용하는 스타일
    plainText:{
        marginTop: 16,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,

        //6)실습에 사용할 스타일
        marginBottom:24,
    },

    //6)실습에 사용할 스타일
    img:{
        marginTop:8,
        flex:1,
        width:null,
        resizeMode:'cover'
    },
});


export default MainComponent;