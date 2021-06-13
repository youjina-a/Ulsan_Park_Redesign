//이미지를 감싸는div
const slideGroup = document.querySelector('#slide_group');
//이전다음 링크를 가진 div
const nav = document.querySelector('#nav');
//인디케이터 ul
const ul = document.querySelector('#indi ul');
let innerli = '';
let current = 1;
let prev;
let next;
let timer;
//노드복사!!!!!
const firstImg = slideGroup.firstElementChild.cloneNode(true);
const lastImg = slideGroup.lastElementChild.cloneNode(true);
//마지막에 자식요소를 추가하기
slideGroup.appendChild(firstImg);
//원하는 위치에 자식요소를 추가하기  부모요소.insertBefore(추가할요소,추가할위치);
slideGroup.insertBefore(lastImg,slideGroup.firstElementChild);
//img를 담은 NodeList
const slideImgs = document.querySelectorAll('.slide_img');
let listImgNum = slideImgs.length - 1;
//이미지를 감싸는 div크기를 이미지갯수 * 100 %로변경
slideGroup.style.width =  (slideImgs.length) * 100 + '%';
slideGroup.style.left = -(current*100)+'%';
//슬라이드 이미지의 크기를 100/이미지갯수 %로변경
//슬라이드 이지지의 left도 100/이미지갯수 % * index
slideImgs.forEach((item,index)=>{
    item.style.width = (100/slideImgs.length) + '%';
    item.style.left = (index * (100/slideImgs.length)) + '%';
})
//인디케이터 li를 만들어서 ul에 뿌리기
for(let i=1; i<listImgNum; i++){
    i==1? innerli += `<li class='on'>${i}</li>` : innerli += `<li>${i}</li>`;
}
ul.innerHTML = innerli;
const lis = document.querySelectorAll('#indi li');

//nav에 이벤트를 연결하기
nav.addEventListener('click',function(event){
    //이전연결된 이벤트 해지
    event.preventDefault();
    console.log(event.target.className);
    //prev버튼을 클릭했을때
    if(event.target.className == 'prev'){
        prev = current - 1;
        slideMove(prev);
    }
    //next를 클릭했을때
    else {
        next = current + 1;
        slideMove(next);
    }
});
//nav에 이미지전환 멈춤/ 시작 이벤트 연결하기
nav.addEventListener('mouseenter', stopMove); 
nav.addEventListener('mouseleave', startMove);
ul.addEventListener('mouseenter', stopMove); 
ul.addEventListener('mouseleave', startMove);
//인디게이터에 이벤트 연결하기
ul.addEventListener('click', function(e){
   let num = Number(e.target.innerHTML);
   slideMove(num);
})

//슬라이드div를 이동시키는 함수
function slideMove(imgNum){
    slideGroup.style.transition = 0.5+'s';
    slideGroup.style.left = -(imgNum*100)+'%';
    current = imgNum;
    console.log(current);
    if(imgNum==listImgNum){
        firstCurrent();
    }
    if(imgNum==0){
        lastCurrent();
    }
    indiChange(current);
}
function firstCurrent(){
    current =1;
    indiChange(current);
    setTimeout(function(){
        slideGroup.style.transition = '0s';
        slideGroup.style.left = -(100)+'%';
        current = 1;
    },500)
}
function lastCurrent(){
    current = listImgNum-1;
    indiChange(current);
    setTimeout(function(){
        slideGroup.style.transition = '0s';
        slideGroup.style.left = -(listImgNum-1)*100+'%';
    },500)
}
//인디게이터 클래스 지정하기
function indiChange(index){
    lis.forEach((item) => {
        item.hasAttribute('class')? item.classList.remove('on') : console.log('no');
    })
    lis[index-1].classList.add('on');
}
//자동으로 이미지 전환하기 setinterval1시작하기
function startMove(){
    console.log('시작');
    timer = setInterval( () => slideMove(current+1) ,2000)};
    //setInterval정지하기
    function stopMove(){
        clearInterval(timer);
        console.log('중지');
    }
    startMove();
    // stopMove();