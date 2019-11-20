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

const update = (event) => {
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
  update(event);
}

const onMouseLeaveHandler = () => {
    inner.style = ''
}

const onMouseMoveHandler = event => {
    if (isTimeToUpdate()) {
        update(event)
    }
}


const cursor = document.querySelector('#ball')

document.addEventListener('mousemove', e => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        cursor.innerHTML = '<p>↑</p>'
    } else {
        cursor.innerHTML = '<p>↓</p>'
    }
    cursor.setAttribute('style', 'top: ' + (e.pageY + 10) + 'px; left: ' + (e.pageX + 10) + 'px;')
})




mouse.setOrigin(container)
container.onmouseenter = onMouseEnterHandler
container.onmouseleave = onMouseLeaveHandler
container.onmousemove = onMouseMoveHandler



