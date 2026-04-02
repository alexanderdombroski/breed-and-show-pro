<script lang="ts">
  import { BreederMockData } from "../BreederMockData.js";
  import "../styles/breeder-pages.css";

  const baseUrl = import.meta.env.BASE_URL;

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
    <a href={`${baseUrl}/herd/`} class="widget-link">
        <h3>Herd</h3>
    </a>
  </div>

  <div class="herd-container">
    <a href={`${baseUrl}/herd/open`} class="herd-button">
      <span>({countByStatus("open")}) Open</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
    <a href={`${baseUrl}/herd/bred`} class="herd-button">
      <span>({countByStatus("bred")}) Bred</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
    <a href={`${baseUrl}/herd/farrowed`} class="herd-button">
      <span>({countByStatus("farrowed")}) Farrow</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
    <a href={`${baseUrl}/herd/sires`} class="herd-button">
      <span>({countByStatus("active")}) Sires</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
    <a href={`${baseUrl}/herd/pastLitters`} class="herd-button">
      <span>({countPastLitters()}) Past Litters</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
    <a href={`${baseUrl}/herd/archived`} class="herd-button">
      <span>({countByStatus("archived")}) Archived</span>
      <img src={`${baseUrl}/right-arrow.png`} alt="right-arrow" class="right-arrow" />
    </a>
  </div>
</section>

<style>
  .herd-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 10px;
  }

  .herd-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    color: #333;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-left: 3px solid #f2af29ff;
    padding: 12px 15px;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .herd-button:hover {
    background-color: #fff3e0;
    box-shadow: 0 2px 6px rgba(255, 165, 0, 0.2);
  }

  .right-arrow {
    width: 16px;
    height: 16px;
    margin-left: 10px;
  }
</style>
