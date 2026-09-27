package com.madhavconstruction.madhavconstruction.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.madhavconstruction.madhavconstruction.model.LabourWorkModel;
import com.madhavconstruction.madhavconstruction.repository.LabourWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class LabourWorkService {


        @Autowired
        private LabourWorkRepository repository;

        public LabourWorkModel addLabourWorkSheet(LabourWorkModel material) {

            if (material.getCompany() != null) {
                material.setCompany(material.getCompany().trim().toLowerCase()); // normalize
            }
            return repository.save(material);
        }


        public List<LabourWorkModel> getAllLabourWorkSheet() {
            return repository.findAll();
        }

    public Page<LabourWorkModel> getLabourWorkSheet(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").ascending());

        if (query != null && !query.isEmpty()) {
            // Search by company OR labour name
            return repository.findByCompanyContainingIgnoreCaseOrLabourContainingIgnoreCase(query, query, pageable);
        } else {
            return repository.findAll(pageable);
        }
    }


    public byte[] generateLabourWorkSheetPdf(List<LabourWorkModel> material) {
            try {
                Document document = new Document();
                ByteArrayOutputStream out = new ByteArrayOutputStream();

                PdfWriter.getInstance(document, out);
                document.open();

                // Title
                Font CompanyFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 28);
                Paragraph Companytitle = new Paragraph("Madhav Constructions", CompanyFont);
                Companytitle.setAlignment(Element.ALIGN_CENTER);
                document.add(Companytitle);

                Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
                Paragraph title = new Paragraph("Labour Work Sheet Report", titleFont);
                title.setAlignment(Element.ALIGN_CENTER);
                document.add(title);

                Font dateFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 12);
                String downloadDate = "("+ LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))+")";
                Paragraph dateParagraph = new Paragraph(downloadDate, dateFont);
                dateParagraph.setAlignment(Element.ALIGN_CENTER);
                document.add(dateParagraph);
                document.add(Chunk.NEWLINE);


                // Table setup
                PdfPTable table = new PdfPTable(5);
                table.setWidthPercentage(100);
                table.setWidths(new int[]{2,2,5,3,3});

                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

                // Headers
                table.addCell(new PdfPCell(new Phrase("S.No", headFont)));
                table.addCell(new PdfPCell(new Phrase("Date", headFont)));
                table.addCell(new PdfPCell(new Phrase("Company", headFont)));
                table.addCell(new PdfPCell(new Phrase("Labour", headFont)));
                table.addCell(new PdfPCell(new Phrase("Work", headFont)));

                // Data rows

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                int index = 1;
                double total = 0;
                for (LabourWorkModel k : material) {
                    table.addCell(String.valueOf(index++));
                    table.addCell(k.getDate() != null ? k.getDate().format(formatter) : "-"); // ✅ formatted date
                    table.addCell(k.getCompany());
                    table.addCell(k.getLabour());
                    table.addCell(String.valueOf(k.getWork()));
          
                }

                // Total row
                PdfPCell totalCell = new PdfPCell(new Phrase("Total", headFont));
                totalCell.setColspan(4); // spans first 4 columns
                totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(totalCell);

                PdfPCell totalValue = new PdfPCell(new Phrase(String.format("%.2f", total), headFont));
                totalValue.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(totalValue);

                // Add table to document
                document.add(table);
                document.close();

                return out.toByteArray();

            } catch (Exception e) {
                throw new RuntimeException("Error while generating PDF", e);
            }
        }



        public LabourWorkModel updateLabourWorkSheet(String id, LabourWorkModel updateLabourWork) {
            Optional<LabourWorkModel> existing = repository.findById(id);
            if (existing.isEmpty()) {
                throw new RuntimeException("Material record not found with ID: " + id);
            }

            LabourWorkModel material = existing.get();

            // Update only non-null fields
            if (updateLabourWork.getCompany() != null)
                material.setCompany(updateLabourWork.getCompany().trim().toLowerCase());
            if (updateLabourWork.getLabour() != null)
                material.setLabour(updateLabourWork.getLabour());
            if (updateLabourWork.getDate() != null)
                material.setDate(updateLabourWork.getDate());
            if (updateLabourWork.getWork() != null)
                material.setWork(updateLabourWork.getWork());
            return repository.save(material);
        }

        // ✅ DELETE
        public void deleteLabourWorkSheet(String id) {
            if (!repository.existsById(id)) {
                throw new RuntimeException("LabourWork record not found with ID: " + id);
            }
            repository.deleteById(id);
        }
    }


