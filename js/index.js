console.clear();

class Slider {
	
	constructor($el) {
		this.$el = $el;
		this.$refs = {
			items: [... document.querySelectorAll('[data-slider]', this.$el)],
		};
		this.length = this.$refs.items.length-1;
	}
	
	next() {
		this.slide('next');
	}
	
	prev() {
		this.slide('prev');
	}
	
	slide(direction){
		this.$refs.items.map(el => {
			const pos = Number(el.getAttribute('data-position'));
			const next = (pos+1) > this.length ? 0 : pos+1;
			const prev = (pos-1) < 0 ? this.length : pos-1;
			const go = direction == "next" ? next : prev;
			
			el.setAttribute('data-position', go)
		})
	}
	
	jump(pos){
		for(let i = 0; i < pos; i++) {
			const timeout = setTimeout(()=>{
				this.slide('prev')
			}, 100)
		}
	}
	
};

const slider = new Slider(document.querySelector('[data-component="slider"]'));

document.querySelector('.arrow--prev').addEventListener('click', ()=>{
	slider.next()
})
document.querySelector('.arrow--next').addEventListener('click', ()=>{
	slider.prev()
})
document.querySelectorAll('.slider__item').forEach(sliderItem => {
	sliderItem.addEventListener('click', ()=>{
		const pos = Number(sliderItem.getAttribute("data-position"));
		
		slider.jump(pos)
	})
})



//  2-slider codi



const holder = document.querySelector(".holder"),
  navigations = Array.from(document.querySelectorAll(".navigation i")),
  bullets = Array.from(document.querySelectorAll(".controls li"));
let slideIndex = 0;

const changeBullets = () => {
  document.querySelector(".controls .selected").classList.remove("selected");
  bullets[slideIndex].classList.add("selected");
};

navigations.forEach((nav) => {
  nav.addEventListener("click", () => {
    if (nav.classList.contains("left")) {
      slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
      holder.style.transform = "translate(" + slideIndex * -25 + "%)";
    } else {
      slideIndex = slideIndex < 3 ? slideIndex + 1 : 3;
      holder.style.transform = "translate(" + slideIndex * -25 + "%)";
    }
    changeBullets();
  });
});

bullets.forEach((bul, index) => {
  bul.addEventListener("click", () => {
    slideIndex = index;
    changeBullets();
    holder.style.transform = "translate(" + slideIndex * -25 + "%)";
  });
});
