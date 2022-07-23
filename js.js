const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    let bill = ref(null);
    let people = ref(null);
    let tip = ref(null);
    let tipInput = ref(null);
    let showError = ref(false);

    let tipAmount = computed(() => {
      if (bill.value <= 0 || people.value <= 0) return;

      total = (bill.value * tip.value) / 100;
      return (total / people.value).toFixed(2);
    });

    let total = computed(() => {
      if (bill.value <= 0 || people.value <= 0) return;

      total = bill.value / people.value;
      return (total + Number(tipAmount.value)).toFixed(2);
    });

    let cachedTip = ref(null);
    function setTip(number, e) {
      if (cachedTip.value != null) cachedTip.value.classList.toggle("selected");
      e.target.classList.toggle("selected");
      cachedTip.value = e.target;
      tip.value = number;
    }

    function setTipInput() {
      if (cachedTip.value != null) cachedTip.value.classList.remove("selected");
      tip.value = tipInput.value;
    }

    let checkResetBtn = computed(() => {
      return people.value > 0;
    });

    function checkInputs(input) {
      console.log(input.target.value);
      if (Number(input.target.value) > 0 || input.target.value === "") {
        input.target.parentNode.classList.remove("error");
      } else {
        input.target.parentNode.classList.add("error");
      }
    }

    function reset() {
      cachedTip.value.classList.remove("selected");
      bill.value = "";
      people.value = "";
      tip.value = "";
      total.value = "";
    }
    return {
      bill,
      people,
      tip,
      tipAmount,
      total,
      tipInput,
      setTip,
      reset,
      setTipInput,
      checkResetBtn,
      checkInputs,
      showError,
    };
  },
}).mount("#app");
