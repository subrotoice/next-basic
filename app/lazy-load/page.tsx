"use client";
import React, { useState } from "react";

const LazyPage = () => {
  return (
    <div>
      <h1>Lazy Page</h1>
      <button
        onClick={async () => {
          const _ = (await import("lodash")).default;

          const users = [{ name: "c" }, { name: "b" }, { name: "a" }];
          const sorted = _.orderBy(users, ["name"]);
          console.log(sorted);
        }}
      >
        Sort
      </button>
    </div>
  );
};

export default LazyPage;
