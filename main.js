// 전역 변수 사용회피 위해 즉시 실행 익명 함수
(()=> {
    //이 안에서 변수를 만들면 지역변수가 되기 때문에 바깥에서 접근할 수 없음. -> 보호가 됨!

    const actions = {
        birdFlies(key) {
            if(key) {
            //부모의 데이터 index 정보 이용해서 셀릭트
            //해당 selector로 뽑은 곳에 x으로 윈도우의 inner width 픽셀 만큼 날아가도록
                document.querySelector('[data-index="2"] .bird').style.transform=`translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform=`translateX(-100%)`;
            }
    },

     birdFlies2(key) {
            if(key) {
                document.querySelector('[data-index="5"] .bird').style.transform=`translate(${window.innerWidth}px,${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform=`translateX(-100%)`;
            }
    }
    }

    const stepElement = document.querySelectorAll('.step');
    const graphElement = document.querySelectorAll('.graphic-item');
    let currentItem = graphElement[0]; //현재 활성화된 visible 클래스가 붙은 graphic-item;
    let ioIndex;
    //눈에 보이게 됐는지, 사라졌는지, 어떤 비율에서 부터 보였는지 등등..다양함. 
      //observer가 관찰을 하도록 등록을 해줘야함. io를 사용해서 관찰을 시키는 것.
    const io = new IntersectionObserver((entries, observer)=> {
        //중간에 0 찍히는데 이거는 사라지니까.
        // 문자열 -> 숫자로 바꿔야
        ioIndex = entries[0].target.dataset.index * 1;
        // console.log(ioIndex);
    });


    for(let i =0; i <stepElement.length; i++) {
        // stepElement[i].setAttribute('data-index',i);
        io.observe(stepElement[i]); //모든 말풍선들이 관찰대상으로 등록됨. 
        stepElement[i].dataset.index = i;
        graphElement[i].dataset.index = i;
    }

    //Current visible 붙여주기
    function activate(action) {
        currentItem.classList.add('visible');
        if(action) {
            actions[action](true);
        }
    }

    // "" 삭제
    function inactivate(action) {
        currentItem.classList.remove('visible');
        if(action) {
            actions[action](false);
        }
    }
    
    //스크롤 이벤트가 발생할 때 
    window.addEventListener('scroll', () => {
        //말풍선들의 위치 체크.
        let step;
        let boundingRect;

            //현재 보이는 부분, 보이는 전 부분, 보이는 다음 부분 세번만 체크 되게.
            for(let i = ioIndex -1; i< ioIndex +2; i++) {
            step=stepElement[i];
            if(!step) continue;

            boundingRect = step.getBoundingClientRect();
            //창 사이즈 높이를 기준으로 100으로 했을 때 80% 정도 들어오면
            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                //몇 번 째 인덱스가 나오는지
                if(currentItem) {
                    inactivate(currentItem.dataset.action);
                }

                //action 가져오기
                currentItem = graphElement[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    activate();
})();

