const container = document.getElementById('container')
const inner = document.getElementById('inner')

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

const $ = document.querySelector.bind(document)
const $on = document.addEventListener.bind(document)

let xmouse, ymouse
$on('mousemove', (e) => {
    xmouse = e.clientX || e.pageX
    ymouse = e.clientY || e.pageY
})

const ball = $('#ball')
let x = void 0,
    y = void 0,
    dx = void 0,
    dy = void 0,
    tx = 0,
    ty = 0,
    key = -1

const followMouse = () => {
    key = requestAnimationFrame(followMouse)

    if (!x || !y) {
        x = xmouse
        y = ymouse
    } else {
        dx = (xmouse - x) * 0.125
        dy = (ymouse - y) * 0.125
        if(Math.abs(dx) + Math.abs(dy) < 0.1) {
            x = xmouse
            y = ymouse
        } else {
            x  += dx
            y += dy
        }
    }
    ball.style.left = x + 'px'
    ball.style.top = y + 'px'
}

const text = document.querySelector('#scroll')

document.addEventListener('scroll', () => {
    const yoff = window.pageYOffset
    const background_scale = 500

    if (yoff < background_scale) {
        const perc = yoff / background_scale
        text.style.transform = `scale(${1 + 0.4 * perc})`
    } 
})


followMouse()
mouse.setOrigin(container)
container.onmouseenter = onMouseEnterHandler
// container.onmouseleave = onMouseLeaveHandler
container.onmousemove = onMouseMoveHandler



