async function load_wad(wad_path: string) {
  const wad_buffer = await Bun.file(wad_path).arrayBuffer();
  const wad_dataview = new DataView(wad_buffer);

  const wad_type_uint32 = wad_dataview.getUint32(0, true);
  const wad_type = String.fromCharCode(
    wad_type_uint32 & 0xff,
    (wad_type_uint32 >> 8) & 0xff,
    (wad_type_uint32 >> 16) & 0xff,
    (wad_type_uint32 >> 24) & 0xff,
  );
  const wad_lumps_number = wad_dataview.getUint32(4, true);
  const wad_dir_offset = wad_dataview.getUint32(8, true);

  return {
    wad_type,
    wad_lumps_number,
    wad_dir_offset,
  };
}

function print_wad(wad_info: any) {
  console.log(wad_info.wad_type);
  console.log(wad_info.wad_lumps_number);
  console.log(wad_info.wad_dir_offset);
}

const wad_info_iwad = await load_wad("./DOOM.WAD");
print_wad(wad_info_iwad);

const wad_info_iwad2 = await load_wad("./DOOM64.WAD");
print_wad(wad_info_iwad2);

const wad_info_pwad = await load_wad("./10sector.wad");
print_wad(wad_info_pwad);

export {};
