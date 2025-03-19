const pricing_btn = document.querySelectorAll(".pricing_btn ");
const active_bg = document.querySelector(".active_bg");
const pricing = document.querySelectorAll(".pricing");
const payment = document.querySelectorAll(".payment ");
const monthly = document.querySelectorAll(".monthly");
const yearly = document.querySelectorAll(".yearly");
const monthly_icon = document.querySelectorAll(".monthly_icon");
const yearly_icon = document.querySelectorAll(".yearly_icon");


pricing_btn.forEach(function(btn){
    btn.addEventListener("click",function(){
        pricing_btn.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        // var active_width = this.offsetWidth;
        var active_left = this.offsetLeft;
        active_bg.style.cssText = "left:" +active_left+ "px;";
        var class_name = this.getAttribute("data-class");
        pricing.forEach(function(c){
            c.classList.remove("active");
        });
        document.querySelector("." + class_name).classList.add("active");
    });
});

payment.forEach(function(payment_btn){
    payment_btn.addEventListener("click",function(){
     

        if(this.classList.contains("monthly")){
            monthly.forEach(payment_btn => payment_btn.classList.remove("active"));
            this.classList.add("active");
            monthly_icon.forEach(select_icon=> select_icon.classList.remove("active"));
            this.querySelector(".select_icon").classList.add("active");
        }
        if(this.classList.contains("yearly")){
            yearly.forEach(payment_btn => payment_btn.classList.remove("active"));
            this.classList.add("active");
            yearly_icon.forEach(select_icon=> select_icon.classList.remove("active"));
            this.querySelector(".select_icon").classList.add("active");
        }
    });
});



