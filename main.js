// 전역 변수 사용회피 위해 즉시 실행 익명 함수
(()=> {
    //이 안에서 변수를 만들면 지역변수가 되기 때문에 바깥에서 접근할 수 없음. -> 보호가 됨!

    const stepElement = document.querySelectorAll('.step');
    const graphElement = document.querySelectorAll('.graphic-item');
    let currentItem; //현재 활성화된 visible 클래스가 붙은 graphic-item;

    for(let i =0; i <stepElement.length; i++) {
        // stepElement[i].setAttribute('data-index',i);
        stepElement[i].dataset.index = i;
        graphElement[i].dataset.index = i;
    }
    
    //스크롤 이벤트가 발생할 때 
    window.addEventListener('scroll', () => {
        //말풍선들의 위치 체크.
        let step;
        let boundingRect;
        for(let i = 0; i< stepElement.length; i++) {
            step=stepElement[i];
            boundingRect = step.getBoundingClientRect();
            
            //창 사이즈 높이를 기준으로 100으로 했을 때 80% 정도 들어오면
            
            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                //몇 번 째 인덱스가 나오는지
                // console.log(step.dataset.index);
                if(currentItem) {
                currentItem.classList.remove('visible');
                }

                currentItem = graphElement[step.dataset.index];
                currentItem.classList.add('visible');
            }

        }
    });

})();

