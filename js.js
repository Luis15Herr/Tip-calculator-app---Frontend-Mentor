const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    let bill = ref(null);
    let people = ref(null);
    let tip = ref(null);
    let tipInput = ref(null);

    let tipAmount = computed(() => {
      if (!people.value) return;
      total = (bill.value * tip.value) / 100;
      return (total / people.value).toFixed(2);
    });

    let total = computed(() => {
      if (!bill.value || !people.value) return;
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
      if (!total.value) return;
      return true;
    });

    function reset() {
      bill.value = "";
      people.value = "";
      tip.value = "";
      tipAmount.value = "";
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
    };
  },
}).mount("#app");
