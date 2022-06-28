// 전역 변수 사용회피 위해 즉시 실행 익명 함수
(()=> {
    //이 안에서 변수를 만들면 지역변수가 되기 때문에 바깥에서 접근할 수 없음. -> 보호가 됨!

    const stepElement = document.querySelectorAll('.step');
    const graphElement = document.querySelectorAll('.graphic-item');

    for(let i =0; i <stepElement.length; i++) {
        // stepElement[i].setAttribute('data-index',i);
        stepElement[i].dataset.index = i;
        graphElement[i].dataset.index = i;
    }
    
})();