let ws
let canvas = document.getElementById("screen")
let ctx = canvas.getContext("2d")

function connect() {

    let ip = document.getElementById("ip").value

    ws = new WebSocket("ws://" + ip + ":8080")

    ws.onmessage = function(event) {

        let img = new Image()

        img.onload = function() {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img,0,0)
        }

        img.src = "data:image/jpeg;base64," + event.data
    }

}

canvas.addEventListener("mousemove", e => {

    if(!ws) return

    ws.send(JSON.stringify({
        type:"move",
        x:e.offsetX,
        y:e.offsetY
    }))

})

canvas.addEventListener("click", e => {

    if(!ws) return

    ws.send(JSON.stringify({
        type:"click"
    }))

})
