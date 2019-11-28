print("landscape in");
class Landscape {
  constructor(width_ = 800, height_ = 800, order_ = 10) {
    this.width = width_;
    this.height = height_;
    this.maxOrder = Math.max(1, order_);
    this.currentOrder = Math.max(1, Math.floor(order_ / 2));

    this.name = "Sol de Perlin à l'ordre - " + this.maxOrder;

    this.factors = [];
    this.noises = [];

    for (let i = 0; i < this.maxOrder; i++) {
      this.factors.push((Math.random() + 1) / 2 * 1 / Math.pow(2, i));
      this.noises.push(new PerlinNoise(-this.width / 1.5, this.width / 1.5, Math.pow(2, i + 2), -this.height / 1.5, this.height / 1.5, Math.pow(2, i + 2)));
    }
  }

  changeCurrentOrder(intensity = 1) {
    this.currentOrder = Math.max(1, Math.min(this.maxOrder, this.currentOrder + intensity));
  }

  altitude(x, y) {
    let z = 0;
    for (let k = 0; k < this.currentOrder; k++) {
      z += this.noises[k].noise(x, y) * this.factors[k];
    }
    return Math.max(300 * z, -50);
  }

  colorFunction(position) {
    let color = 0;
    let lastNoise = this.noises.last();
    if (position.z < -49.9) {
      color = 180 + lastNoise.noise(position.x, position.y) * 10;
    } else {
      color = 65 + (10 - 100) / 300 * position.z + lastNoise.noise(position.x, position.y) * 20 * 0;
    }
    return color;
  }
}

print("landscape.jsee ok");