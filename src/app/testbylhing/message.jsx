<div
  className="image-gallery preview flex flex-wrap gap-6"
  draggable={true}
  onDragOver={allowDrop}
>
  {values.roomGallery && !Object.keys(values.roomGallery).length ? (
    <label className="cursor-grab active:cursor-grabbing">
      <Image
        src={UploadPicSmall}
        alt="background upload"
        className="cursor-pointer shadow-lg hover:opacity-95"
        width={120}
        height={120}
      />
      <input
        name="roomGallery"
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={handleMainImage}
      />
    </label>
  ) : values.roomGallery && Object.keys(values.roomGallery).length < 10 ? (
    Object.keys(values.roomGallery).map((id, i) => {
      const file = values.roomGallery[id];
      if (i === Object.keys(values.roomGallery).length - 1) {
        return (
          <div key={id} className="flex gap-5">
            <div
              className="image-preview-container relative w-fit cursor-grab active:cursor-grabbing"
              onDragStart={dragStart}
              onDragEnter={dragEnter}
              onDragEnd={() => drop("image")}
              drag_id={i}
            >
              <img
                className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                src={
                  typeof file === "object"
                    ? URL.createObjectURL(file[Object.keys(file)[0]])
                    : file
                }
                alt={"gallery image"}
                width={100}
                drag_id={i}
              />
              <button
                className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                onClick={(event) =>
                  handleDeleteImage(event, id, "roomGallery", i)
                }
              >
                x
              </button>
            </div>
            <label className="">
              <Image
                src={UploadPicSmall}
                alt="background upload"
                className="cursor-pointer shadow-lg hover:opacity-95"
                width={120}
                height={120}
              />
              <input
                name="roomGallery"
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleMainImage}
              />
            </label>
          </div>
        );
      }
      return (
        <div key={id}>
          <div
            key={id}
            className="image-preview-container relative w-fit cursor-grab active:cursor-grabbing"
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragEnd={() => drop("image")}
            drag_id={i}
          >
            <img
              className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
              src={
                typeof file === "object"
                  ? URL.createObjectURL(file[Object.keys(file)[0]])
                  : file
              }
              drag_id={i}
              alt={"gallery image"}
              width={100}
            />
            <button
              className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
              onClick={(event) =>
                handleDeleteImage(event, id, "roomGallery", i)
              }
            >
              x
            </button>
          </div>
        </div>
      );
    })
  ) : (
    <label className="cursor-grab active:cursor-grabbing">
      <Image
        src={UploadPicSmall}
        alt="background upload"
        className="cursor-pointer shadow-lg hover:opacity-95"
        width={120}
        height={120}
      />
      <input
        name="roomGallery"
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={handleMainImage}
      />
    </label>
  )}
</div>;
