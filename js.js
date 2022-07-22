const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    let bill = ref(null);
    let people = ref(null);
    let tip = ref(null);

    let tipAmount = computed(() => {
      if (!people.value) return;
      return ((bill.value * tip.value) / 100 / people.value).toFixed(2);
    });

    let total = computed(() => {
      if (!bill.value || !people.value) return;
      console.log(bill.value, tipAmount.value, people.value);
      total = bill.value + tipAmount.value;
      return total / people.value;
    });

    function setTip(number) {
      tip.value = number;
    }
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

      setTip,
      reset,
    };
  },
}).mount("#app");
