import fetch from 'node-fetch';
import fs from 'fs';
import { parse } from 'json2csv';

const API_URL = 'https://records-ws.nbnatlas.org/occurrences/search';
const CLASS_NAME = 'Aves';
const LONDON_LATITUDE = 51.5074;
const LONDON_LONGITUDE = -0.1278;
const RADIUS_KM = 50;
const PAGE_SIZE = 1000;
const MAX_RECORDS = 700000; // max records

async function fetchBirdData(startIndex) {
  const url = `${API_URL}?q=class:${encodeURIComponent(CLASS_NAME)}&lat=${LONDON_LATITUDE}&lon=${LONDON_LONGITUDE}&radius=${RADIUS_KM}&pageSize=${PAGE_SIZE}&startIndex=${startIndex}`;
  console.log(`Fetching URL: ${url}`);

  const response = await fetch(url);
  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Response body: ${errorText}`);
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  const data = await response.json();
  const records = data.occurrences || data.results || [];
  console.log(`Number of records fetched: ${records.length}`);
  return records;
}

async function saveDataToCSV(data) {
  if (data.length === 0) {
    console.log('No data available. Skipping CSV generation.');
    return;
  }
  const fields = ['scientificName', 'vernacularName', 'decimalLatitude', 'decimalLongitude', 'eventDate', 'stateProvince', 'country'];
  const csv = parse(data, { fields });
  const filePath = './bird_distribution_london.csv';
  fs.writeFileSync(filePath, csv);
  console.log(`Data saved to ${filePath}`);
}

async function main() {
  let allData = [];
  let startIndex = 0;

  try {
    while (startIndex < MAX_RECORDS) {
      const data = await fetchBirdData(startIndex);
      if (data.length === 0) {
        break; // If there is no more data, exit the loop
      }
      allData = allData.concat(data);
      startIndex += PAGE_SIZE;
      // waiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    // If the total number of records exceeds MAX_RECORDS, the previous MAX_RECORDS record is captured
    if (allData.length > MAX_RECORDS) {
      allData = allData.slice(0, MAX_RECORDS);
    }
    await saveDataToCSV(allData);
  } catch (err) {
    console.error(`Error fetching data: ${err.message}`);
  }
}

main();
