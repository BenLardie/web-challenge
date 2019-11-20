const container = document.getElementById('container')
const inner = document.getElementById('inner')

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader')
    loader.className += ' hidden'
})

let mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: (event) => {
        let e = event || window.event
        this.x = e.clientX - this._x
        this.y = (e.clientY - this._y) * -1
    },
    setOrigin: (e) => {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    }
}

const update =  (event) => {
    mouse.updatePosition(event);
    updateTransformStyle(
        (event.y / inner.offsetHeight / 2).toFixed(2),
        (event.x / inner.offsetWidth / 2).toFixed(2)
    );
};

const updateTransformStyle = (x, y) => {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
};

let counter = 0
let updateRate = 5

const isTimeToUpdate = () => {
    return counter++ % updateRate === 0
}

const onMouseEnterHandler = (event) => {
    update(event)
}

const onMouseLeaveHandler = () => {
    inner.style = ''
}

const onMouseMoveHandler = (event) => {
    if (isTimeToUpdate()) {
        update(event)
    }
}

// const select = document.querySelector.bind(document)
// const listener = document.addEventListener.bind(document)

// let xmouse, ymouse
// listener('mousemove', (e) => {
//     xmouse = e.clientX || e.pageX
//     ymouse = e.clientY || e.pageY
// })

// const ball = select('#ball')
// let x = void 0,
//     y = void 0,
//     dx = void 0,
//     dy = void 0,
//     tx = 0,
//     ty = 0,
//     key = -1

// const followMouse = () => {
//     key = requestAnimationFrame(followMouse)

//     if (!x || !y) {
//         x = xmouse
//         y = ymouse
//     } else {
//         dx = (xmouse - x) * 0.125
//         dy = (ymouse - y) * 0.125
//         if(Math.abs(dx) + Math.abs(dy) < 0.1) {
//             x = xmouse
//             y = ymouse
//         } else {
//             x  += dx
//             y += dy
//         }
//     }
//     ball.style.left = x + 'px'
//     ball.style.top = y + 'px'
// }

const cursor = document.querySelector('#ball')

document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', 'top: ' + (e.pageY + 10 ) + 'px; left: '+ (e.pageX + 10) + 'px;' )
})



// window.addEventListener('scroll', () => {
//     target = document.querySelectorAll('.scroll')
//     console.log(target)
//     target.forEach((element, index) => {
//         console.log(element)
//         let pos = window.pageYOffset * element[index].dataset.rate
//         element[index].style.transform = 'translate3d(0px, '+ pos +'px, 0px)'
//     });
// })



// followMouse()
mouse.setOrigin(container)
container.onmouseenter = onMouseEnterHandler
// container.onmouseleave = onMouseLeaveHandler
container.onmousemove = onMouseMoveHandler



