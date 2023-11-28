const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xe5e5e5,
});

document.body.appendChild(app.view);

const rectangle = new PIXI.Graphics();
rectangle.beginFill(0xffffff);
rectangle.drawRect(300, 200, 200, 150);
rectangle.endFill();
app.stage.addChild(rectangle);

const control1 = createControl(300, 200);
const control2 = createControl(500, 200);
const control3 = createControl(300, 350);
const control4 = createControl(500, 350);

const border = new PIXI.Graphics();
app.stage.addChild(border);

function createControl(x, y) {
  const control = new PIXI.Graphics();
  control.beginFill(0xaaaaaa);
  control.drawCircle(0, 0, 10);
  control.endFill();
  control.position.set(x, y);
  control.interactive = true;
  control.buttonMode = true;

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  control.on("pointerdown", (event) => {
    isDragging = true;
    dragOffsetX = event.data.global.x - control.x;
    dragOffsetY = event.data.global.y - control.y;
  });

  control.on("pointermove", (event) => {
    if (isDragging) {
      const newPositionX = event.data.global.x - dragOffsetX;
      const newPositionY = event.data.global.y - dragOffsetY;

      const deltaX = newPositionX - control.x;
      const deltaY = newPositionY - control.y;

      rectangle.width += deltaX;
      rectangle.height += deltaY;

      control.x = newPositionX;
      control.y = newPositionY;
    }
  });

  control.on("pointerup", () => {
    isDragging = false;
  });

  app.stage.addChild(control);

  return control;
}

let isSelected = false;

function selectElement() {
  rectangle.tint = 0xff0000;
  isSelected = true;
}

function unselectElement() {
  rectangle.tint = 0xffffff;
  isSelected = false;
}

rectangle.interactive = true;
rectangle.on("pointerdown", () => {
  if (!isSelected) {
    selectElement();
  } else {
    unselectElement();
  }
});

app.ticker.add(() => {
  border.clear();
  border.lineStyle(2, 0xff0000);
  border.moveTo(control1.x, control1.y);
  border.lineTo(control2.x, control2.y);
  border.lineTo(control4.x, control4.y);
  border.lineTo(control3.x, control3.y);
  border.lineTo(control1.x, control1.y);
});
