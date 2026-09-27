package com.madhavconstruction.madhavconstruction.controller;
import com.madhavconstruction.madhavconstruction.model.LabourWorkModel;
import com.madhavconstruction.madhavconstruction.repository.LabourWorkRepository;
import com.madhavconstruction.madhavconstruction.service.LabourWorkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/v2/api/labourworksheet")
public class LabourWorkController {


    public LabourWorkController(LabourWorkService service, LabourWorkRepository repository) {
        this.service = service;
        this.repository = repository;
    }

        private final LabourWorkService service;
        private final LabourWorkRepository repository;
        // ✅ Add record
    
        @PostMapping
        public ResponseEntity<LabourWorkModel> addLabourWorkSheet(@RequestBody LabourWorkModel material) {
            return ResponseEntity.ok(service.addLabourWorkSheet(material));
        }

        // ✅ Get all records
        @GetMapping
        public ResponseEntity<List<LabourWorkModel>> getAllLabourWorkSheet() {
            return ResponseEntity.ok(service.getAllLabourWorkSheet());
        }

        @GetMapping("/all")
        public Page<LabourWorkModel> getAllLabourWorkSheet(
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "5") int size
        )
        {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
            return repository.findAll(pageable);
        }

    @GetMapping("/search")
    public Page<LabourWorkModel> getLabourWorkSheet(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return service.getLabourWorkSheet(query, page, size);
    }




    // ✅ Update existing record
        @PutMapping("/{id}")
        public ResponseEntity<LabourWorkModel> updateLabourWorkSheet(
                @PathVariable String id,
                @RequestBody LabourWorkModel updateLabourWorkSheet) {
            return ResponseEntity.ok(service.updateLabourWorkSheet(id, updateLabourWorkSheet));
        }

        // ✅ Delete record
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteLabourWorkSheet(@PathVariable String id) {
            service.deleteLabourWorkSheet(id);
            return ResponseEntity.noContent().build();
        }

        @GetMapping("/download-pdf")
        public ResponseEntity<byte[]> downloadLabourWorkSheetPdf() {
            List<LabourWorkModel> material = service.getAllLabourWorkSheet(); // fetch all data
            byte[] pdfBytes = service.generateLabourWorkSheetPdf(material);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Labour_Work_Sheet_report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        }
}
