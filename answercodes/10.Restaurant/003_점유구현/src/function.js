// 이 코드는 설명을 쉽게 하기 위해 한글로 변수명을 사용합니다.
// 이 코드는 맨 뒤에 세미콜론을 붙이지 않습니다.
// 코드는 추후에 다듬도록 하겠습니다.
class Restaurant{
    //constructor
    //예약번호, 예약인원, 현재상태(대기중, 식사중, 식사완료, 거절)
    constructor(테이블1인, 테이블2인, 테이블4인){
        //this.테이블1인 = 테이블1인
        //this.테이블2인 = 테이블2인
        //this.테이블4인 = 테이블4인
        this.테이블확인 = [
            {
                테이블종류 : '테이블1인',
                테이블번호 : 0,
                테이블의자 : 테이블1인[0].getElementsByClassName('chair-item')[0],
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블1인',
                테이블번호 : 1,
                테이블의자 : 테이블1인[0].getElementsByClassName('chair-item')[1],
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블1인',
                테이블번호 : 2,
                테이블의자 : 테이블1인[0].getElementsByClassName('chair-item')[2],
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블2인',
                테이블번호 : 3,
                테이블의자 : 테이블2인[0].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블2인',
                테이블번호 : 4,
                테이블의자 : 테이블2인[1].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블2인',
                테이블번호 : 5,
                테이블의자 : 테이블2인[2].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블4인',
                테이블번호 : 6,
                테이블의자 : 테이블4인[0].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블4인',
                테이블번호 : 7,
                테이블의자 : 테이블4인[1].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블4인',
                테이블번호 : 8,
                테이블의자 : 테이블4인[2].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블4인',
                테이블번호 : 9,
                테이블의자 : 테이블4인[3].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            }, {
                테이블종류 : '테이블4인',
                테이블번호 : 10,
                테이블의자 : 테이블4인[4].getElementsByClassName('chair-item'),
                테이블상태 : '이용가능'
            } 
        ]
    }

    clock() {
        var 화면영업시간 = document.getElementsByClassName('time')[0]

        화면영업시간.innerText = `${시 < 10 ? `0${시}` : 시}:${분 < 10 ? `0${분}` : 분}:00`
        분 += 1

        if(분 >= 60){
            분 = 0
            시 += 1
        }
            
    }
}

class RestaurantGuests{
    //constructor
    //예약번호, 예약인원, 현재상태(대기중, 식사중, 식사완료, 거절)
    constructor(예약번호, 예약인원, 현재상태){
        this.예약번호 = 예약번호
        this.예약인원 = 예약인원
        this.현재상태 = 현재상태
        this.식시시간 = 0
        this.식사테이블 = -1
    }
}

function 버튼클릭() {
    const 입력창 = document.getElementById('식사인원')
    예약인원 = parseInt(입력창.value, 10)
    //console.log(입력값)
    입력창.value = ''
    document.getElementById('경고문구').innerHTML = ''
    if (시 >= 종료시간){
        document.getElementById('경고문구').innerHTML = '<strong style="color:red;">※ 영업이 종료되었습니다.</strong>'
        return
    }
    if (예약인원 >= 5){
        document.getElementById('경고문구').innerHTML = '<strong style="color:red;">※ 코로나로 인해 5인 이상은 예약을 받고 있지 않습니다.</strong>'
        data.push(new RestaurantGuests(예약번호, 예약인원, '거절'))
        예약번호 += 1
    } else if (예약인원 >= 0){
        //console.log('5인미만')
        //식사중 또는 대기중
        data.push(new RestaurantGuests(예약번호, 예약인원, '대기중'))
        예약번호 += 1
    } else {
        document.getElementById('경고문구').innerHTML = '<strong style="color:red;">※ 제대로 된 숫자를 입력하세요.</strong>'
    }
    테이블생성()
}

function 테이블생성(){
    //console.log(data)
    let tableBodyData = []
    for (const iterator of data) {
        if (iterator.현재상태 == '대기중'){
            tableBodyData.push(`
            <tr>
                <td>${iterator.예약번호}</td>
                <td>${iterator.예약인원}</td>
                <td class="waiting">${iterator.현재상태}</td>
            </tr>
            `)
        } else if (iterator.현재상태 == '거절'){
            tableBodyData.push(`          
            <tr>
                <td>${iterator.예약번호}</td>
                <td>${iterator.예약인원}</td>
                <td class="reject">${iterator.현재상태}</td>
            </tr>
            `)
        } else {
            tableBodyData.push(`
            <tr>
                <td>${iterator.예약번호}</td>
                <td>${iterator.예약인원}</td>
                <td>${iterator.현재상태}</td>
            </tr>
            `)
        }

        
    }
    document.querySelector('.reservation-table > tbody').innerHTML = tableBodyData.join('')
}

function 영업개시클릭() {
    const 테이블1인 = document.getElementsByClassName('bar-table')
    const 테이블2인 = document.getElementsByClassName('rec-table')
    const 테이블4인 = document.getElementsByClassName('circle-table')
    var restaurant = new Restaurant(테이블1인, 테이블2인, 테이블4인)
    //console.log(restaurant)
    //console.log(restaurant.테이블2인[0])
    //console.log(restaurant.테이블2인[0].getElementsByClassName('chair-item')[0])
    //restaurant.테이블2인[0].getElementsByClassName('chair-item')[0].classList.add('test')
    //restaurant.테이블2인[0].getElementsByClassName('chair-item')[0].classList.remove('on')

    //시간표시
    var timer = setInterval(function(){
        restaurant.clock()
        //console.log(data)
        for (const guest of data) {
            //점유코드
            if (guest.현재상태 == '대기중'){
                if(guest.예약인원 == 1){
                    for (const 테이블 of restaurant.테이블확인) {
                        if (테이블.테이블종류 == '테이블1인' && 테이블.테이블상태 == '이용가능' && guest.현재상태 == '대기중'){
                            테이블.테이블의자.classList.add('on')
                            테이블.테이블상태 = '이용불가능'
                            guest.현재상태 = '식사중'
                            guest.식사테이블 = 테이블.테이블번호
                        }
                    }
                }
                if(guest.예약인원 == 2){
                    for (const 테이블 of restaurant.테이블확인) {
                        if (테이블.테이블종류 == '테이블2인' && 테이블.테이블상태 == '이용가능' && guest.현재상태 == '대기중'){
                            테이블.테이블의자[0].classList.add('on')
                            테이블.테이블의자[1].classList.add('on')
                            테이블.테이블상태 = '이용불가능'
                            guest.현재상태 = '식사중'
                            guest.식사테이블 = 테이블.테이블번호
                        }
                    }
                }
                if(guest.예약인원 == 3 || guest.예약인원 == 4){
                    for (const 테이블 of restaurant.테이블확인) {
                        if (테이블.테이블종류 == '테이블4인' && 테이블.테이블상태 == '이용가능' && guest.현재상태 == '대기중'){
                            for (let 인원 = 0; 인원 < guest.예약인원; 인원++) {
                                테이블.테이블의자[인원].classList.add('on')
                            }
                            테이블.테이블상태 = '이용불가능'
                            guest.현재상태 = '식사중'
                            guest.식사테이블 = 테이블.테이블번호
                        }
                    }
                }
            }
            if (guest.현재상태 == '식사중' && guest.식시시간 < 60){
                guest.식시시간 += 1
            } else if (guest.식시시간 >= 60 && guest.현재상태 == '식사중'){
                guest.현재상태 = '식사완료'
                restaurant.테이블확인[guest.식사테이블].테이블상태 = '이용가능'
                if (guest.예약인원 == 1) {
                    restaurant.테이블확인[guest.식사테이블].테이블의자.classList.remove('on')
                } else {
                    for (let 인원 = 0; 인원 < guest.예약인원; 인원++) {
                        restaurant.테이블확인[guest.식사테이블].테이블의자[인원].classList.remove('on')
                    }
                }
            }
        }
        테이블생성()

        if (시 >= 종료시간){
            clearInterval(timer)
        }
    }, 1000)
}

var 예약번호 = 1
var 시 = 8
var 종료시간 = 22
var 분 = 1

var data = []

const 식사인원입력 = document.getElementById('예약버튼')
식사인원입력.addEventListener('click', 버튼클릭)

const 영업개시버튼 = document.getElementById('영업개시')
영업개시버튼.addEventListener('click', 영업개시클릭)