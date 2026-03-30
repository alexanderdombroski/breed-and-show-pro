<script lang="ts">
  import { BreederMockData } from "../BreederMockData.js";

  function countByStatus(status: string) {
  return BreederMockData.animals.filter((pig) => pig.status === status).length;
}

function countPastLitters() {
  const today = new Date();

  return BreederMockData.litters.filter((litter) => {
    // If it has a weaned date → count it
    if (litter.weanedDate) return true;

    // Otherwise, check if 30 days past farrow date
    if (litter.farrowDate) {
      const farrowDate = new Date(litter.farrowDate);
      // Add 30 days to the farrow date
      farrowDate.setDate(farrowDate.getDate() + 30);
      return farrowDate <= today;
    }

    return false;
  }).length;
}

</script>

<section class="widget-container">
  <div class="title">
    <a href="/task/" class="widget-link">
        <h3>Herd</h3>
    </a>
  </div>

  <div class="herd-container">
    <a href="/herd/open" class="herd-button">
      <span>({countByStatus("open")}) Open</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
    <a href="/herd/bred" class="herd-button">
      <span>({countByStatus("bred")}) Bred</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
    <a href="/herd/farrowed" class="herd-button">
      <span>({countByStatus("farrowed")}) Farrow</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
    <a href="/herd/sires" class="herd-button">
      <span>({countByStatus("active")}) Sires</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
    <a href="/herd/pastLitters" class="herd-button">
      <span>({countPastLitters()}) Past Litters</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
    <a href="/herd/archived" class="herd-button">
      <span>({countByStatus("archived")}) Archived</span>
      <img src="/right-arrow.png" alt="right-arrow" class="right-arrow" />
    </a>
  </div>
</section>

<style>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 5;
    padding: 5px 0;
  }

  .widget-link {
    text-decoration: none;
    color: inherit;
  }
  
  .widget-link:hover {
    color: orange;
  }
  
  .widget-container {
    border: 1px solid orange;
    padding: 10px 15px;
    margin: 20px 0;
    height: 400px;
    width: 320px;
    overflow: auto;
  }
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  
   .message {
    text-align: center;
    font-size: 1.2em;
    color: #555;
    margin-top: 40px;
  }

  .herd-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .herd-container a {
    width: 90%;
    margin: 0 auto;
  }

  .herd-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    font-size: 18px;
    color: black;
    background-color: #f2af29ff;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .herd-button:hover {
    background-color: #f0b746cc;
  }

  .right-arrow {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    justify-content: center;
    display: inline-flex;
    vertical-align: middle;
  }
</style>
